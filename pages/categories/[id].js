import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function CategoryDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
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
      setCategory(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching category details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      toast.success('Category deleted successfully');
      router.push('/categories');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      console.error('Error deleting category:', err);
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
        <title>Category Details</title>
        <meta name="description" content="View category details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="mb-6">
          <Link href="/categories" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Categories
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Category Details</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center py-4">Loading category details...</p>
        ) : !category ? (
          <p className="text-center py-4">Category not found</p>
        ) : (
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-gray-500 text-sm">Category Name</h2>
                  <p className="text-lg">{category.name}</p>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Created At</h2>
                  <p className="text-lg">{new Date(category.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Last Updated</h2>
                  <p className="text-lg">{new Date(category.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link 
                href={`/categories/edit/${id}`}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Edit Category
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete Category
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}