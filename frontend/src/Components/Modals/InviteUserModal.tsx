import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Chip } from '@mui/material';

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string[]) => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  open,
  onClose,
  onInvite,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setEmailInput('');
      setEmailList([]);
      setError('');
    }
  }, [open]);

  const handleAddEmail = () => {
    const email = emailInput.trim();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format.');
      return;
    }

    if (emailList.includes(email)) {
      setError('Email already added.');
      return;
    }

    setEmailList([...emailList, email]);
    setEmailInput('');
    setError('');
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

  const handleInvite = () => {
    if (emailList.length === 0) {
      setError('Please enter at least one email.');
      return;
    }

    onInvite(emailList);
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
          Invite to Home
        </h2>

        {/* Email input */}
        <TextField
          label="Enter email and press Enter"
          fullWidth
          variant="outlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error}
        />

        {/* Email list */}
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
            onClick={handleInvite}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 hover:shadow-md transition"
          >
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteUserModal;
