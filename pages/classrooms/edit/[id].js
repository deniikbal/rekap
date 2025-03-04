import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import ClassroomForm from '../../../components/ClassroomForm';

export default function EditClassroom() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    teacher: ''
  });
  const [loading, setLoading] = useState(true);
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
    }
  }, [id, isAuthenticated]);

  const fetchClassroom = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/classrooms/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch classroom details');
      }
      
      const data = await response.json();
      setFormData({
        name: data.name,
        teacher: data.teacher
      });
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      console.error('Error fetching classroom details:', err);
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
        <title>Edit Classroom</title>
        <meta name="description" content="Edit classroom information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="mb-6">
          <Link href={`/classrooms/${id}`} className="text-blue-600 hover:text-blue-800">
            &larr; Back to Classroom Details
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Edit Classroom</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center py-4">Loading classroom details...</p>
        ) : (
          <ClassroomForm initialData={formData} isEdit={true} />
        )}
      </div>
    </DashboardLayout>
  );
}