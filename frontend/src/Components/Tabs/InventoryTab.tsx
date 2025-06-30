import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  TableSortLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { InventoryItem } from '../../types/inventoryItem';

type SortField = 'location' | 'quantity' | 'expirationDate';
type SortOrder = 'asc' | 'desc';

// Mock data
const mockInventory: InventoryItem[] = Array.from({ length: 23 }, (_, i) => ({
  id: `${i + 1}`,
  homeId: 'home123',
  catalogItemId: `catalog${i + 1}`,
  quantity: Math.floor(Math.random() * 10) + 1,
  location: ['Pantry', 'Fridge', 'Garage'][i % 3],
  expirationDate:
    i === 4
      ? '2023-12-01' // Expired item (item #5)
      : `2025-07-${((i % 28) + 1).toString().padStart(2, '0')}`,
  notes: i % 2 === 0 ? 'Rotate stock' : '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Fake catalog name mapping
const catalogMap = new Map<string, string>(
  mockInventory.map((item) => [
    item.catalogItemId,
    `Item ${item.catalogItemId.slice(7)}`,
  ])
);

const InventoryTab: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 15;
  const [sortField, setSortField] = useState<SortField>('expirationDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const today = new Date();

  const sortedItems = [...mockInventory].sort((a, b) => {
    let aValue: string | number = '';
    let bValue: string | number = '';

    if (sortField === 'location') {
      aValue = a.location || '';
      bValue = b.location || '';
    } else if (sortField === 'quantity') {
      aValue = a.quantity;
      bValue = b.quantity;
    } else if (sortField === 'expirationDate') {
      aValue = a.expirationDate || '';
      bValue = b.expirationDate || '';
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return sortOrder === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const paginatedItems = sortedItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Header */}
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h6" color="primary">
          Inventory Items
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 2,
            px: 2.5,
            py: 1,
            borderRadius: 2,
          }}
          onClick={() => alert('Open add item modal')}
        >
          Add New Item
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={2} sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Item Name</TableCell>

              <TableCell
                sortDirection={sortField === 'location' ? sortOrder : false}
              >
                <Tooltip title="Click to sort by location" arrow>
                  <TableSortLabel
                    active={sortField === 'location'}
                    direction={sortField === 'location' ? sortOrder : 'asc'}
                    onClick={() => handleSort('location')}
                  >
                    Location
                  </TableSortLabel>
                </Tooltip>
              </TableCell>

              <TableCell
                sortDirection={sortField === 'quantity' ? sortOrder : false}
              >
                <Tooltip title="Click to sort by quantity" arrow>
                  <TableSortLabel
                    active={sortField === 'quantity'}
                    direction={sortField === 'quantity' ? sortOrder : 'asc'}
                    onClick={() => handleSort('quantity')}
                  >
                    Quantity
                  </TableSortLabel>
                </Tooltip>
              </TableCell>

              <TableCell
                sortDirection={
                  sortField === 'expirationDate' ? sortOrder : false
                }
              >
                <Tooltip title="Click to sort by expiration" arrow>
                  <TableSortLabel
                    active={sortField === 'expirationDate'}
                    direction={
                      sortField === 'expirationDate' ? sortOrder : 'asc'
                    }
                    onClick={() => handleSort('expirationDate')}
                  >
                    Expiration
                  </TableSortLabel>
                </Tooltip>
              </TableCell>

              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedItems.map((item, index) => {
              const itemName = catalogMap.get(item.catalogItemId) ?? 'Unknown';
              const expDate = item.expirationDate
                ? new Date(item.expirationDate)
                : null;
              const isExpired = expDate ? expDate < today : false;
              const isExpiringSoon =
                expDate && !isExpired
                  ? expDate.getTime() - today.getTime() <
                    7 * 24 * 60 * 60 * 1000
                  : false;

              return (
                <TableRow
                  key={item.id}
                  sx={{
                    backgroundColor: isExpired
                      ? '#ffebee'
                      : index % 2 === 0
                        ? 'white'
                        : '#fafafa',
                  }}
                >
                  <TableCell>{itemName}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.expirationDate ? (
                      <Tooltip
                        title={
                          isExpired
                            ? 'Expired'
                            : isExpiringSoon
                              ? 'Expiring soon'
                              : ''
                        }
                      >
                        <Typography
                          color={
                            isExpired
                              ? 'error'
                              : isExpiringSoon
                                ? 'orange'
                                : 'textPrimary'
                          }
                          fontWeight={
                            isExpired || isExpiringSoon ? 'bold' : 'normal'
                          }
                        >
                          {item.expirationDate}
                        </Typography>
                      </Tooltip>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>{item.notes || '—'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={sortedItems.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </Paper>
    </Box>
  );
};

export default InventoryTab;
