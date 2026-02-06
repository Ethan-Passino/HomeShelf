import React, { useMemo } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import DataTable from '../Common/DataTable';
import TableFilters from '../Common/TableFilters';
import type { Column } from '../Common/DataTable';
import RowCard from '../Common/RowCard';
import type { User } from '../../../../backend/src/schemas/user';

export type MemberWithRole = User & {
  role: 'owner' | 'admin' | 'member';
  status: 'invited' | 'active';
};

interface MembersTabProps {
  members: MemberWithRole[];
}

const MembersTab: React.FC<MembersTabProps> = ({ members }) => {
  const [search, setSearch] = React.useState('');

  const rows: MemberWithRole[] = useMemo(() => members, [members]);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const needle = search.toLowerCase();
    return rows.filter(
      (row) =>
        row.displayName.toLowerCase().includes(needle) ||
        row.email.toLowerCase().includes(needle)
    );
  }, [rows, search]);

  const columns: Column<MemberWithRole>[] = [
    {
      id: 'avatar',
      label: 'Avatar',
      width: 80,
      render: (row) => (
        <Avatar sx={{ width: 40, height: 40 }}>
          {row.displayName[0]?.toUpperCase() ?? '?'}
        </Avatar>
      ),
    },
    {
      id: 'displayName',
      label: 'Name',
      sortable: true,
      sortValue: (row) => row.displayName,
      render: (row) => row.displayName,
    },
    {
      id: 'role',
      label: 'Role',
      sortable: true,
      sortValue: (row) => row.role,
      render: (row) => row.role,
    },
    {
      id: 'email',
      label: 'Email',
      sortable: true,
      sortValue: (row) => row.email,
      render: (row) => row.email,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" color="primary" mb={4}>
        Home Members
      </Typography>

      <TableFilters
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search name or email"
        elevation={0}
      />

      <DataTable
        rows={filtered}
        columns={columns}
        defaultRowsPerPage={12}
        rowsPerPageOptions={[12]}
        getRowId={(row) => row.id}
        emptyMessage="No members yet. Invite someone to get started."
        stripedColors={['white', '#fafafa']}
        renderCard={(row) => (
          <RowCard
            overline={
              row.role === 'owner'
                ? 'Owner'
                : row.role === 'admin'
                  ? 'Admin'
                  : 'Member'
            }
            media={
              <Avatar sx={{ width: 48, height: 48 }}>
                {row.displayName[0]?.toUpperCase() ?? '?'}
              </Avatar>
            }
            title={row.displayName}
            subtitle={`${row.email} • ${row.status === 'invited' ? 'Invited' : 'Active'}`}
          />
        )}
        cardBreakpoint="sm"
      />
    </Box>
  );
};

export default MembersTab;
