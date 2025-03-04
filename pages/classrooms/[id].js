import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function ClassroomDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (id && isAuthenticated) {
      fetchClassroom();
      fetchStudents();
    }
  }, [id, isAuthenticated]);

  const fetchStudents = async () => {
    try {
      setStudentsLoading(true);
      const response = await fetch(`/api/students?classroom_id=${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const fetchClassroom = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/classrooms/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch classroom details');
      }
      
      const data = await response.json();
      setClassroom(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching classroom details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this classroom?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/classrooms/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete classroom');
      }
      
      toast.success('Classroom deleted successfully');
      router.push('/classrooms');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      console.error('Error deleting classroom:', err);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated and not loading, the useEffect will redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Classroom Details</title>
        <meta name="description" content="View classroom details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="mb-6">
          <Link href="/classrooms" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Classrooms
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Classroom Details</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center py-4">Loading classroom details...</p>
        ) : !classroom ? (
          <p className="text-center py-4">Classroom not found</p>
        ) : (
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-gray-500 text-sm">Classroom Name</h2>
                  <p className="text-lg">{classroom.name}</p>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Teacher</h2>
                  <p className="text-lg">{classroom.teacher}</p>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Created At</h2>
                  <p className="text-lg">{new Date(classroom.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Last Updated</h2>
                  <p className="text-lg">{new Date(classroom.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Students in this Classroom</h2>
              {studentsLoading ? (
                <p className="text-center py-4">Loading students...</p>
              ) : students.length === 0 ? (
                <p className="text-center py-4">No students in this classroom.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">NIS</th>
                        <th className="py-2 px-4 border-b text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{student.name}</td>
                          <td className="py-2 px-4 border-b">{student.nis}</td>
                          <td className="py-2 px-4 border-b text-center">
                            <div className="flex justify-center space-x-2">
                              <Link 
                                href={`/students/${student.id}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                View
                              </Link>
                              <Link 
                                href={`/students/edit/${student.id}`}
                                className="text-green-600 hover:text-green-800"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <Link 
                href={`/classrooms/edit/${id}`}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Edit Classroom
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete Classroom
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}