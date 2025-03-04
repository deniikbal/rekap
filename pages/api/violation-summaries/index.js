import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getViolationSummaries(req, res);
    case 'POST':
      return await createViolationSummary(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get all violation summaries
async function getViolationSummaries(req, res) {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    
    // Calculate pagination offsets
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    let query = supabase
      .from('violation_summaries')
      .select(`
        *,
        students:student_id (id, name, nis),
        violations:violation_id (id, name, point, categories:categories_id(id, name))
      `, { count: 'exact' });
    
    // Apply search filter if provided
    if (search) {
      // Join with students table to search by student name
      query = query.or(`students.name.ilike.%${search}%,violations.name.ilike.%${search}%`);
    }
    
    // Apply pagination
    query = query.range(from, to);
    
    // Order by date descending
    query = query.order('date', { ascending: false });
    
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch violation summaries', error: error.message });
    }

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems: count,
        totalPages
      }
    });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Create a new violation summary
async function createViolationSummary(req, res) {
  try {
    const { student_id, violation_id, date } = req.body;

    // Validate the input
    if (!student_id || !violation_id || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the student exists
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('id', student_id)
      .single();

    if (studentError || !student) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Check if the violation exists
    const { data: violation, error: violationError } = await supabase
      .from('violations')
      .select('id')
      .eq('id', violation_id)
      .single();

    if (violationError || !violation) {
      return res.status(400).json({ message: 'Invalid violation ID' });
    }
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('violation_summaries')
      .insert([{ student_id, violation_id, date }])
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to save violation summary data', error: error.message });
    }

    return res.status(201).json({ message: 'Violation summary created successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}