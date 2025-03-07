import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalViolations: 0,
    recentActivity: [],
    classroomViolations: {
      labels: [],
      data: []
    }
  });

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        // Extract users array from response (handling both array and {data: []} formats)
        const users = Array.isArray(usersData) ? usersData : (usersData.data || []);

        // Fetch students
        const studentsResponse = await fetch('/api/students');
        const students = await studentsResponse.json();

        // Fetch violations
        const violationsResponse = await fetch('/api/violations');
        const violationsData = await violationsResponse.json();
        // Extract violations array from response (handling both array and {data: []} formats)
        const violations = Array.isArray(violationsData) ? violationsData : (violationsData.data || []);

        // Fetch classrooms with their violations
        const classroomsResponse = await fetch('/api/classrooms');
        const classroomsData = await classroomsResponse.json();
        
        // Extract classrooms array from response (handling both array and {data: []} formats)
        const classrooms = Array.isArray(classroomsData) ? classroomsData : (classroomsData.data || []);

        // Process classroom violations data
        const classroomViolationsData = classrooms.map(classroom => ({
          name: classroom.name,
          violationCount: violations.filter(v => v.classroom_id === classroom.id).length
        }));

        setStats({
          totalUsers: users.length,
          totalStudents: students.length,
          totalViolations: violations.length,
          recentActivity: users.slice(0, 5),
          classroomViolations: {
            labels: classroomViolationsData.map(c => c.name),
            data: classroomViolationsData.map(c => c.violationCount)
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Violations by Classroom'
      }
    }
  };

  const chartData = {
    labels: stats.classroomViolations.labels,
    datasets: [
      {
        label: 'Number of Violations',
        data: stats.classroomViolations.data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

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
        <title>Dashboard | User Management</title>
        <meta name="description" content="User management dashboard" />
      </Head>

      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Users Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          
          {/* Students Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Total Students</h2>
            <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
          </div>

          {/* Violations Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Total Violations</h2>
            <p className="text-3xl font-bold text-red-600">{stats.totalViolations}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <Bar options={chartOptions} data={chartData} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Users</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((user) => (
                <div key={user.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{new Date(user.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}