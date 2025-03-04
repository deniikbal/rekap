import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../components/DashboardLayout';
import ViolationForm from '../../../components/ViolationForm';
import { useAuth } from '../../../contexts/AuthContext';

export default function EditViolation() {
  const router = useRouter();
  const { id } = router.query;
  const [violation, setViolation] = useState(null);
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
      fetchViolation();
    }
  }, [id, isAuthenticated]);

  const fetchViolation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/violations/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch violation details');
      }
      
      const data = await response.json();
      setViolation(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching violation details:', err);
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
        <title>Edit Violation | Violation Management</title>
        <meta name="description" content="Edit violation details" />
      </Head>

      <div>
        <h1 className="text-3xl font-bold mb-6">Edit Violation</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center py-4">Loading violation details...</p>
        ) : !violation ? (
          <p className="text-center py-4">Violation not found</p>
        ) : (
          <ViolationForm initialData={violation} isEdit={true} />
        )}
      </div>
    </DashboardLayout>
  );
}