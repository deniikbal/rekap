import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import StudentForm from '../../../components/StudentForm';
import { useAuth } from '../../../contexts/AuthContext';

export default function EditStudent() {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // Fetch student data if authenticated and ID is available
    if (isAuthenticated && id) {
      fetchStudent();
    }
  }, [authLoading, isAuthenticated, id, router]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`/api/students/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch student');
      }

      setStudent(data);
    } catch (error) {
      console.error('Error fetching student:', error);
      setError(error.message);
    } finally {
      setLoading(false);
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
        <title>Edit Student | Student Management</title>
        <meta name="description" content="Edit student information" />
      </Head>

      <div>
        <h1 className="text-3xl font-bold mb-6">Edit Student</h1>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          student && <StudentForm initialData={student} />
        )}
      </div>
    </DashboardLayout>
  );
}