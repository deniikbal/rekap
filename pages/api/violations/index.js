import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getViolations(req, res);
    case 'POST':
      return await createViolation(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get all violations
async function getViolations(req, res) {
  try {
    const { search, page = 1, limit = 10, categories_id } = req.query;
    
    // Calculate pagination offsets
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    let query = supabase
      .from('violations')
      .select('*, categories(name)', { count: 'exact' });
    
    // Apply search filter if provided
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    // Filter by category if provided
    if (categories_id) {
      query = query.eq('categories_id', categories_id);
    }
    
    // Apply pagination
    query = query.range(from, to);
    
    // Order by created_at
    query = query.order('created_at', { ascending: false });
    
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch violations', error: error.message });
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

// Create a new violation
async function createViolation(req, res) {
  try {
    const { name, point, categories_id } = req.body;

    // Validate the input
    if (!name || !point || !categories_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Validate point is a number
    if (isNaN(point)) {
      return res.status(400).json({ message: 'Point must be a number' });
    }
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('violations')
      .insert([{ name, point, categories_id }])
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to save violation data', error: error.message });
    }

    return res.status(201).json({ message: 'Violation created successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}