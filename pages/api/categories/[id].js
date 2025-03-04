import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getCategoryById(req, res, id);
    case 'PUT':
      return await updateCategory(req, res, id);
    case 'DELETE':
      return await deleteCategory(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get a single category by ID
async function getCategoryById(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Update a category
async function updateCategory(req, res, id) {
  try {
    const { name } = req.body;

    // Validate the input
    if (!name) {
      return res.status(400).json({ message: 'Name is required to update' });
    }

    // Update category in Supabase
    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to update category', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category updated successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete a category
async function deleteCategory(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Category not found or already deleted' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}