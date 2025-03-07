import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'default', variant = 'default' }) {
  const modalRef = useRef();

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Close modal on escape key press
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes based on the size prop
  const sizeClasses = {
    small: 'sm:max-w-md sm:w-full',
    default: 'sm:max-w-3xl sm:w-full md:w-3/4 lg:w-2/3',
    large: 'sm:max-w-4xl sm:w-full md:w-5/6 lg:w-3/4'
  };
  // Variant classes for different modal styles
  const variantClasses = {
    default: 'bg-white',
    danger: 'bg-white'
  };
  // Content padding classes
  const contentPaddingClasses = {
    small: 'px-4 py-3',
    default: 'px-6 py-5',
    large: 'px-8 py-6'
  };
  // Header classes
  const headerClasses = {
    small: 'mb-3 pb-2',
    default: 'mb-5 pb-3',
    large: 'mb-6 pb-4'
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen px-4 py-4 w-full text-center">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div 
          className={`inline-block align-middle ${variantClasses[variant]} rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${sizeClasses[size]} mx-auto`}
          ref={modalRef}
        >
          <div className={`${variantClasses[variant]} ${contentPaddingClasses[size]}`}>
            <div className={`flex justify-between items-center ${headerClasses[size]} border-b`}>
              <h3 className={`${size === 'small' ? 'text-base' : 'text-lg'} leading-6 font-medium text-gray-900`}>{title}</h3>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className={`${size === 'small' ? 'h-5 w-5' : 'h-6 w-6'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}