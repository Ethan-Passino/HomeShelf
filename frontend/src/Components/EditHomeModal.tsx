import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface EditHomeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  onDelete: () => void;
  initialName: string;
}

const EditHomeModal: React.FC<EditHomeModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  initialName,
}) => {
  const [name, setName] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setShowConfirmDelete(false); // reset when opening modal
    }
  }, [open, initialName]);

  const handleSave = () => {
    onSave(name.trim());
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Home</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Danger Zone */}
          <div className="flex justify-between items-center mt-4 bg-red-50 border border-red-200 rounded p-3">
            <div>
              <p className="text-red-600 font-medium text-sm">Danger Zone</p>
              <p className="text-gray-600 text-sm">
                Deleting this home is permanent.
              </p>
            </div>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="flex items-center gap-1 border border-red-500 text-red-600 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition text-sm"
            >
              <DeleteIcon fontSize="small" />
              Delete
            </button>
          </div>

          {/* Confirm Delete Prompt */}
          {showConfirmDelete && (
            <div className="mt-2 border border-red-300 bg-red-100 rounded p-4 text-sm text-red-800 space-y-2">
              <p>
                Are you sure you want to delete this home? This can NOT be
                undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    onClose();
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100 hover:text-gray-900 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 hover:shadow-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHomeModal;
