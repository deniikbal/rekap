import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Script from 'next/script';

export default function ViolationSummaryForm({ initialData, isEdit }) {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    student_id: '',
    violation_id: '',
    date: new Date().toISOString().split('T')[0] // Default to today's date
  });
  const [categories, setCategories] = useState([]);
  const [violations, setViolations] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const studentSelectRef = useRef(null);
  const [isSelect2Loaded, setIsSelect2Loaded] = useState(false);
  
  // Initialize Select2 after the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn.select2 && studentSelectRef.current && students.length > 0) {
      initializeSelect2();
      setIsSelect2Loaded(true);
      console.log('Select2 initialized with students:', students.length);
      console.log('Initial student_id:', initialData?.student_id);
    }
  }, [students, initialData, studentSelectRef.current]);

  // Initialize Select2 for student dropdown
  const initializeSelect2 = () => {
    const $ = window.jQuery;
    $(studentSelectRef.current).select2({
      placeholder: 'Search for a student...',
      allowClear: true,
      width: '100%'
    }).on('change', function() {
      const selectedValue = $(this).val();
      console.log('Student selected:', selectedValue); // Debug log
      setFormData(prev => ({
        ...prev,
        student_id: selectedValue
      }));
    });

    // Set initial value if editing
    if (initialData && initialData.student_id) {
      $(studentSelectRef.current).val(initialData.student_id).trigger('change');
    }
  };

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const result = await response.json();
        setCategories(result.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch students for the dropdown
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const result = await response.json();
        setStudents(result.data || []);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err.message);
      }
    };
    
    fetchStudents();
  }, []);

  // Fetch violations when category changes
  useEffect(() => {
    const fetchViolations = async () => {
      if (!selectedCategory) {
        setViolations([]);
        return;
      }
      
      try {
        const response = await fetch(`/api/violations?categories_id=${selectedCategory}`);
        if (!response.ok) {
          throw new Error('Failed to fetch violations');
        }
        const result = await response.json();
        setViolations(result.data || []);
      } catch (err) {
        console.error('Error fetching violations:', err);
        setError(err.message);
      }
    };
    
    fetchViolations();
  }, [selectedCategory]);

  // Set initial form data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        student_id: initialData.student_id || '',
        violation_id: initialData.violation_id || '',
        date: initialData.date || new Date().toISOString().split('T')[0]
      });
      
      // If we have the violation data with its category, set the selected category
      if (initialData.violations?.categories?.id) {
        setSelectedCategory(initialData.violations.categories.id);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    // Reset violation selection when category changes
    setFormData(prevData => ({
      ...prevData,
      violation_id: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Client-side validation before submission
    const missingFields = [];
    if (!formData.student_id) missingFields.push('Student');
    if (!formData.violation_id) missingFields.push('Violation');
    if (!formData.date) missingFields.push('Date');

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
      setError(errorMessage);
      toast.error(errorMessage);
      setIsSubmitting(false);
      return;
    }

    // Log form data for debugging
    console.log('Submitting form data:', formData);

    try {
      const url = isEdit ? `/api/violation-summaries/${id}` : '/api/violation-summaries';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      // Form submitted successfully
      toast.success(isEdit ? 'Violation summary updated successfully!' : 'Violation summary created successfully!');
      // Redirect to appropriate page
      router.push('/violation-summaries');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (studentSelectRef.current && !isSelect2Loaded) {
            initializeSelect2();
            setIsSelect2Loaded(true);
          }
        }}
      />
      <link
        href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
        rel="stylesheet"
      />
      
      <h2 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit Violation Summary' : 'Record New Violation'}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="violation_id" className="block text-gray-700 font-medium mb-2">
            Violation
          </label>
          <select
            id="violation_id"
            name="violation_id"
            value={formData.violation_id}
            onChange={handleChange}
            required
            disabled={!selectedCategory}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a violation</option>
            {violations.map((violation) => (
              <option key={violation.id} value={violation.id}>
                {violation.name} ({violation.point} points)
              </option>
            ))}
          </select>
          {!selectedCategory && (
            <p className="text-sm text-gray-500 mt-1">Please select a category first</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="student_id" className="block text-gray-700 font-medium mb-2">
            Student
          </label>
          <select
            id="student_id"
            name="student_id"
            ref={studentSelectRef}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.nis})
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Violation Summary' : 'Record Violation')}
        </button>
      </form>
    </div>
  );
}