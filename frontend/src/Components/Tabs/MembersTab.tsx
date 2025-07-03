import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  TablePagination,
  Grid,
} from '@mui/material';

interface MembersTabProps {
  memberIds: string[];
}

const MembersTab: React.FC<MembersTabProps> = ({ memberIds }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 12;

  const paginated = memberIds.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box>
      <Typography variant="h6" color="primary" mb={2}>
        Home Members
      </Typography>

      <Grid container spacing={2}>
        {paginated.map((id, index) => (
          <Grid key={id}>
            <Card
              elevation={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                gap: 2,
                height: 100,
                maxWidth: 360,
                backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                mx: 'auto',
              }}
            >
              <Avatar sx={{ width: 48, height: 48 }}>
                {id[0].toUpperCase()}
              </Avatar>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="body2" color="textSecondary">
                  User ID: {id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Username: <i>coming soon</i>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: <i>coming soon</i>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={0} sx={{ mt: 2 }}>
        <TablePagination
          component="div"
          count={memberIds.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </Paper>
    </Box>
  );
};

export default MembersTab;
