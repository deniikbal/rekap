import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getUsers(req, res);
    case 'POST':
      return await createUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get all users
async function getUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const { name, gender, address } = req.body;

    // Validate the input
    if (!name || !gender || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Attempting to insert data into Supabase users table...');
    console.log('Data being inserted:', { name, gender, address });
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, gender, address }])
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to save user data', error: error.message });
    }

    return res.status(201).json({ message: 'User created successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}