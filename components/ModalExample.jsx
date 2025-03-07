import { useState } from 'react';
import Modal from './Modal';

export default function ModalExample() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Modal Examples</h1>
      
      <div className="space-x-4">
        {/* Create Modal Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Create Modal
        </button>

        {/* Edit Modal Button */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Open Edit Modal
        </button>

        {/* Delete Modal Button */}
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Open Delete Modal
        </button>
      </div>

      {/* Create Modal - Default size and style */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Item"
        size="default"
        variant="default"
      >
        <div className="mt-4">
          <p className="mb-4">This is a standard modal for creating new items.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal - Default size and style */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Item"
        size="default"
        variant="default"
      >
        <div className="mt-4">
          <p className="mb-4">This is a standard modal for editing existing items.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal - Small size and danger variant */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="small"
        variant="danger"
      >
        <div className="mt-2 text-center">
          <p className="mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div className="flex justify-center space-x-3 mt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}