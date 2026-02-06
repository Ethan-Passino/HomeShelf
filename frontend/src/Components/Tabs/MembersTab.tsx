import React, { useMemo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import DataTable from "../Common/DataTable";
import TableFilters from "../Common/TableFilters";
import type { Column } from "../Common/DataTable";

interface MembersTabProps {
  memberIds: string[];
}

type MemberRow = {
  id: string;
  username: string;
  email: string;
};

const MembersTab: React.FC<MembersTabProps> = ({ memberIds }) => {
  const [search, setSearch] = React.useState("");

  const rows: MemberRow[] = useMemo(
    () =>
      memberIds.map((id, index) => {
        const username = `member_${index + 1}`;
        const email = `${username}@homeshelf.app`;
        return { id, username, email };
      }),
    [memberIds]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const needle = search.toLowerCase();
    return rows.filter(
      (row) =>
        row.username.toLowerCase().includes(needle) ||
        row.email.toLowerCase().includes(needle)
    );
  }, [rows, search]);

  const columns: Column<MemberRow>[] = [
    {
      id: "avatar",
      label: "Avatar",
      width: 80,
      render: (row) => <Avatar sx={{ width: 40, height: 40 }}>{row.username[0].toUpperCase()}</Avatar>,
    },
    {
      id: "username",
      label: "Username",
      sortable: true,
      sortValue: (row) => row.username,
      render: (row) => row.username,
    },
    {
      id: "email",
      label: "Email",
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
        searchPlaceholder="Search username or email"
        elevation={0}
      />

      <DataTable
        rows={filtered}
        columns={columns}
        defaultRowsPerPage={12}
        rowsPerPageOptions={[12]}
        getRowId={(row) => row.id}
        emptyMessage="No members yet. Invite someone to get started."
        stripedColors={["white", "#fafafa"]}
      />
    </Box>
  );
};

export default MembersTab;
