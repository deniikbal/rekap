import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

export default function ViolationSummaries() {
  const router = useRouter();
  const [violationSummaries, setViolationSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0
  });
  const { loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchViolationSummaries();
    }
  }, [isAuthenticated, pagination.page]);

  const fetchViolationSummaries = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });
      
      if (search) {
        queryParams.append('search', search);
      }
      
      const response = await fetch(`/api/violation-summaries?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch violation summaries');
      }
      
      const result = await response.json();
      setViolationSummaries(result.data || []);
      setPagination(result.pagination || pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching violation summaries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on new search
    fetchViolationSummaries();
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this violation record?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/violation-summaries/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete violation record');
      }
      
      // Remove the deleted violation summary from the state
      setViolationSummaries(violationSummaries.filter(summary => summary.id !== id));
      toast.success('Violation record deleted successfully');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      console.error('Error deleting violation record:', err);
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
        <title>Violation Records</title>
        <meta name="description" content="Manage student violation records" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Violation Records</h1>
          <Link href="/violation-summaries/create" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Record New Violation
          </Link>
        </div>

        {/* Search Form */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search by student or violation..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center py-4">Loading violation records...</p>
        ) : violationSummaries.length === 0 ? (
          <p className="text-center py-4">No violation records found. Add a new record to get started.</p>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Student</th>
                    <th className="py-2 px-4 border-b text-left">Violation</th>
                    <th className="py-2 px-4 border-b text-left">Category</th>
                    <th className="py-2 px-4 border-b text-left">Points</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {violationSummaries.map((summary) => (
                    <tr key={summary.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{summary.students?.name || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{summary.violations?.name || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{summary.violations?.categories?.name || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{summary.violations?.point || 0}</td>
                      <td className="py-2 px-4 border-b">{new Date(summary.date).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <div className="flex justify-center space-x-2">
                          <Link 
                            href={`/violation-summaries/${summary.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Link>
                          <Link 
                            href={`/violation-summaries/edit/${summary.id}`}
                            className="text-green-600 hover:text-green-800"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(summary.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {pagination.totalPages > 0 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${pagination.page <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${pagination.page >= pagination.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{violationSummaries.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}</span> to <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.totalItems)}</span> of{' '}
                      <span className="font-medium">{pagination.totalItems}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={pagination.page <= 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${pagination.page <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                      >
                        <span className="sr-only">First</span>
                        <span>First</span>
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${pagination.page <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                      >
                        <span className="sr-only">Previous</span>
                        <span>Prev</span>
                      </button>
                      
                      {/* Page Numbers */}
                      {[...Array(pagination.totalPages).keys()].map(number => {
                        const pageNumber = number + 1;
                        // Only show a few page numbers around the current page
                        if (
                          pageNumber === 1 ||
                          pageNumber === pagination.totalPages ||
                          (pageNumber >= pagination.page - 1 && pageNumber <= pagination.page + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${pagination.page === pageNumber ? 'bg-blue-50 border-blue-500 text-blue-600 z-10' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          (pageNumber === 2 && pagination.page > 3) ||
                          (pageNumber === pagination.totalPages - 1 && pagination.page < pagination.totalPages - 2)
                        ) {
                          // Show ellipsis
                          return (
                            <span
                              key={pageNumber}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${pagination.page >= pagination.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                      >
                        <span className="sr-only">Next</span>
                        <span>Next</span>
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={pagination.page >= pagination.totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${pagination.page >= pagination.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                      >
                        <span className="sr-only">Last</span>
                        <span>Last</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}