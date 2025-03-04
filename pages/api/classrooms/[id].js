import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Classroom ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getClassroomById(req, res, id);
    case 'PUT':
      return await updateClassroom(req, res, id);
    case 'DELETE':
      return await deleteClassroom(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get a single classroom by ID
async function getClassroomById(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('classrooms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to fetch classroom', error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Update a classroom
async function updateClassroom(req, res, id) {
  try {
    const { name, teacher } = req.body;

    // Validate the input
    if (!name && !teacher) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (teacher) updateData.teacher = teacher;
    // No need to manually set updated_at as we have a trigger in the database

    // Update classroom in Supabase
    const { data, error } = await supabase
      .from('classrooms')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to update classroom', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    return res.status(200).json({ message: 'Classroom updated successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete a classroom
async function deleteClassroom(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('classrooms')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to delete classroom', error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    return res.status(200).json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}