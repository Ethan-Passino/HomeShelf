import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button, IconButton, Chip } from '@mui/material';

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
    if (!email) {
      return;
    }
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 relative">
        <div className="absolute top-4 right-4">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <h2 className="text-xl font-semibold mb-4">Invite to Home</h2>

        {/* Email chips */}
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

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleInvite}>
            Send Invites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteUserModal;
