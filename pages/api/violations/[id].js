import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Violation ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getViolationById(req, res, id);
    case 'PUT':
      return await updateViolation(req, res, id);
    case 'DELETE':
      return await deleteViolation(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get a single violation by ID
async function getViolationById(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('violations')
      .select('*, categories(name)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch violation', error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: 'Violation not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Update a violation
async function updateViolation(req, res, id) {
  try {
    const { name, point, categories_id } = req.body;

    // Validate the input
    if (!name && !point && !categories_id) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (point !== undefined) {
      // Validate point is a number
      if (isNaN(point)) {
        return res.status(400).json({ message: 'Point must be a number' });
      }
      updateData.point = point;
    }
    if (categories_id) updateData.categories_id = categories_id;

    // Update violation in Supabase
    const { data, error } = await supabase
      .from('violations')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to update violation', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Violation not found' });
    }

    return res.status(200).json({ message: 'Violation updated successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete a violation
async function deleteViolation(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('violations')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to delete violation', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Violation not found or already deleted' });
    }

    return res.status(200).json({ message: 'Violation deleted successfully' });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}