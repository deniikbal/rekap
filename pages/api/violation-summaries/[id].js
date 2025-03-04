import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      return await getViolationSummary(req, res, id);
    case 'PUT':
      return await updateViolationSummary(req, res, id);
    case 'DELETE':
      return await deleteViolationSummary(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// Get a single violation summary by ID
async function getViolationSummary(req, res, id) {
  try {
    const { data, error } = await supabase
      .from('violation_summaries')
      .select(`
        *,
        students:student_id (id, name, nis),
        violations:violation_id (id, name, point, categories:categories_id(id, name))
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(404).json({ message: 'Violation summary not found', error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Update a violation summary
async function updateViolationSummary(req, res, id) {
  try {
    const { student_id, violation_id, date } = req.body;

    // Validate the input
    if (!student_id || !violation_id || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the violation summary exists
    const { data: existingSummary, error: existingError } = await supabase
      .from('violation_summaries')
      .select('id')
      .eq('id', id)
      .single();

    if (existingError || !existingSummary) {
      return res.status(404).json({ message: 'Violation summary not found' });
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

    // Update the violation summary
    const { data, error } = await supabase
      .from('violation_summaries')
      .update({ student_id, violation_id, date })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to update violation summary', error: error.message });
    }

    return res.status(200).json({ message: 'Violation summary updated successfully', data });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete a violation summary
async function deleteViolationSummary(req, res, id) {
  try {
    // Check if the violation summary exists
    const { data: existingSummary, error: existingError } = await supabase
      .from('violation_summaries')
      .select('id')
      .eq('id', id)
      .single();

    if (existingError || !existingSummary) {
      return res.status(404).json({ message: 'Violation summary not found' });
    }

    // Delete the violation summary
    const { error } = await supabase
      .from('violation_summaries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Failed to delete violation summary', error: error.message });
    }

    return res.status(200).json({ message: 'Violation summary deleted successfully' });
  } catch (error) {
    console.error('Server error details:', error.toString(), error.stack);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}