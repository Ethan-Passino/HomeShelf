import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

export interface Home {
  id: string;
  name: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
}

// Mock home data (simulate fetched home info)
const mockHome: Home = {
  id: 'home_abc123',
  name: 'My Cozy Home',
  ownerId: 'user789',
  memberIds: ['user789', 'user456', 'user123'],
  createdAt: new Date().toISOString(),
};

const InfoTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" color="primary" mb={2}>
        Home Info
      </Typography>

      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Home Name:
        </Typography>
        <Typography mb={2}>{mockHome.name}</Typography>
        <Divider />

        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Home ID:
        </Typography>
        <Typography mb={2}>{mockHome.id}</Typography>
        <Divider />

        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Owner ID:
        </Typography>
        <Typography mb={2}>{mockHome.ownerId}</Typography>
        <Divider />

        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Created At:
        </Typography>
        <Typography>
          {new Date(mockHome.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default InfoTab;
