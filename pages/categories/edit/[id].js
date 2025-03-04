import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import CategoryForm from '../../../components/CategoryForm';

export default function EditCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    name: ''
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
      fetchCategory();
    }
  }, [id, isAuthenticated]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/categories/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch category details');
      }
      
      const data = await response.json();
      setFormData({
        name: data.name
      });
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      console.error('Error fetching category details:', err);
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
        <title>Edit Category</title>
        <meta name="description" content="Edit category information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="mb-6">
          <Link href={`/categories/${id}`} className="text-blue-600 hover:text-blue-800">
            &larr; Back to Category Details
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Edit Category</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center py-4">Loading category details...</p>
        ) : (
          <CategoryForm initialData={formData} isEdit={true} />
        )}
      </div>
    </DashboardLayout>
  );
}