import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Chip, Typography } from '@mui/material';
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 relative">
        <div className="absolute top-4 right-4">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <h2 className="text-xl font-semibold mb-4">Create New Home</h2>

        <TextField
          label="Home Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          className="mb-4"
        />

        <div className="mb-2 flex flex-wrap gap-2">
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
          label="Invite by Email (press Enter)"
          fullWidth
          variant="outlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!emailError}
          helperText={emailError}
        />

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHomeModal;
