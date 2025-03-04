import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getStudentById(req, res, id);
    case 'PUT':
      return await updateStudent(req, res, id);
    case 'DELETE':
      return await deleteStudent(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get a single student by ID
async function getStudentById(req, res, id) {
  try {
    // Check if Supabase client is properly initialized
    if (!supabase) {
      throw new Error('Database client not initialized');
    }

    // Add timeout to the request
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Database request timeout')), 5000)
    );

    const queryPromise = supabase
      .from('students')
      .select(`
        *,
        classrooms:classroom_id (id, name)
      `)
      .eq('id', id)
      .single();

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return res.status(500).json({
        message: 'Failed to fetch student',
        error: error.message,
        details: error.details
      });
    }

    if (!data) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
      type: error.name
    });
  }
}

// Update a student
async function updateStudent(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('students')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to update student', error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete a student
async function deleteStudent(req, res, id) {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to delete student', error: error.message });
    }

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}