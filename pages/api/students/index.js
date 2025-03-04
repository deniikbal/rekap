import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getStudents(req, res);
    case 'POST':
      return await createStudent(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get all students with their classroom information
async function getStudents(req, res) {
  try {
    const { classroom_id, search, page = 1, limit = 10 } = req.query;
    
    // Calculate pagination offsets
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    let query = supabase
      .from('students')
      .select(`
        *,
        classrooms:classroom_id (id, name)
      `, { count: 'exact' });
    
    // Filter by classroom_id if provided
    if (classroom_id) {
      query = query.eq('classroom_id', classroom_id);
    }
    
    // Apply search filter if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,nis.ilike.%${search}%`);
    }
    
    // Apply pagination
    query = query.range(from, to);
    
    // Order by created_at
    query = query.order('created_at', { ascending: false });
    
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch students', error: error.message });
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

// Create a new student
async function createStudent(req, res) {
  try {
    const { name, nis, classroom_id } = req.body;

    // Validate the input
    if (!name || !nis || !classroom_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the classroom exists
    const { data: classroom, error: classroomError } = await supabase
      .from('classrooms')
      .select('id')
      .eq('id', classroom_id)
      .single();

    if (classroomError || !classroom) {
      return res.status(400).json({ message: 'Invalid classroom ID' });
    }

    // Check if NIS is unique
    const { data: existingStudent, error: nisCheckError } = await supabase
      .from('students')
      .select('id')
      .eq('nis', nis)
      .single();

    if (existingStudent) {
      return res.status(400).json({ message: 'NIS already exists' });
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('students')
      .insert([{ name, nis, classroom_id }])
      .select(`
        *,
        classrooms:classroom_id (id, name)
      `);

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to save student data', error: error.message });
    }

    return res.status(201).json({ message: 'Student created successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}