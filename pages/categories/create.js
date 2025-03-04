import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import CategoryForm from '../../components/CategoryForm';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

export default function CreateCategory() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (loading) {
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
        <title>Create Category | Category Management</title>
        <meta name="description" content="Create a new category" />
      </Head>

      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Category</h1>
        <CategoryForm />
      </div>
    </DashboardLayout>
  );
}