import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function StudentForm({ initialData }) {
  const router = useRouter();
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
        const data = await response.json();
        setClassrooms(data);
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
      const url = initialData
        ? `/api/students/${initialData.id}`
        : '/api/students';
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/students');
    } catch (error) {
      console.error('Error saving student:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">{initialData ? 'Edit Student Information' : 'Student Information'}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="mb-6">
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Student' : 'Create Student')}
        </button>
      </form>
    </div>
  );
}