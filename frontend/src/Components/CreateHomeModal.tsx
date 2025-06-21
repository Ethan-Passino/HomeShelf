import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

interface CreateHomeModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, invitedEmails: string[]) => void;
}

const CreateHomeModal: React.FC<CreateHomeModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setEmailInput('');
      setEmailList([]);
      setNameError('');
      setEmailError('');
    }
  }, [open]);

  const handleAddEmail = () => {
    const email = emailInput.trim();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    if (emailList.includes(email)) {
      setEmailError('Email already added.');
      return;
    }

    setEmailList([...emailList, email]);
    setEmailInput('');
    setEmailError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmailList((prev) => prev.filter((e) => e !== email));
  };

  const handleCreate = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError('Home name is required.');
      return;
    }

    onCreate(trimmedName, emailList);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create a Home
        </h2>

        {/* Home Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {nameError && (
            <p className="text-sm text-red-600 mt-1">{nameError}</p>
          )}
        </div>

        {/* Email Input */}
        <TextField
          label="Invite by Email (press Enter)"
          fullWidth
          variant="outlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!emailError}
          helperText={emailError}
        />

        {/* Email List Chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          {emailList.map((email) => (
            <Chip
              key={email}
              label={email}
              onDelete={() => handleRemoveEmail(email)}
              deleteIcon={<DeleteIcon />}
              color="primary"
              variant="outlined"
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100 hover:text-gray-900 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 hover:shadow-md transition"
          >
            Create Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHomeModal;
