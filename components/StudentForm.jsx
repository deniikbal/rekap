import { useState, useEffect } from 'react';

export default function StudentForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    nis: '',
    classroom_id: ''
  });
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch classrooms for the dropdown
    const fetchClassrooms = async () => {
      try {
        const response = await fetch('/api/classrooms');
        const result = await response.json();
        setClassrooms(result.data || []); // Extract the data array from the response
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        setError('Failed to load classrooms');
      }
    };

    fetchClassrooms();

    // If initialData is provided, set it in the form
    if (initialData) {
      setFormData({
        name: initialData.name,
        nis: initialData.nis,
        classroom_id: initialData.classroom_id
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call the onSubmit callback with the form data
      await onSubmit(formData);
    } catch (error) {
      console.error('Error saving student:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Student Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="nis" className="block text-gray-700 font-medium mb-2">
              NIS
            </label>
            <input
              type="text"
              id="nis"
              name="nis"
              value={formData.nis}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="classroom_id" className="block text-gray-700 font-medium mb-2">
              Classroom
            </label>
            <select
              id="classroom_id"
              name="classroom_id"
              value={formData.classroom_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Student' : 'Create Student')}
          </button>
        </div>
      </form>
    </div>
  );
}