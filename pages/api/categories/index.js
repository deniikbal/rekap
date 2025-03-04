import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getCategories(req, res);
    case 'POST':
      return await createCategory(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get all categories
async function getCategories(req, res) {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    
    // Calculate pagination offsets
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    let query = supabase
      .from('categories')
      .select('*', { count: 'exact' });
    
    // Apply search filter if provided
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    // Apply pagination
    query = query.range(from, to);
    
    // Order by created_at
    query = query.order('created_at', { ascending: false });
    
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
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

// Create a new category
async function createCategory(req, res) {
  try {
    const { name } = req.body;

    // Validate the input
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to save category data', error: error.message });
    }

    return res.status(201).json({ message: 'Category created successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}