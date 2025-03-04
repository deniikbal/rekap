import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getUserById(req, res, id);
    case 'PUT':
      return await updateUser(req, res, id);
    case 'DELETE':
      return await deleteUser(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get a single user by ID
async function getUserById(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Update a user
async function updateUser(req, res, id) {
  try {
    const { name, gender, address } = req.body;

    // Validate the input
    if (!name && !gender && !address) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (gender) updateData.gender = gender;
    if (address) updateData.address = address;
    updateData.updated_at = new Date();

    // Update user in Supabase
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to update user', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete a user
async function deleteUser(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}