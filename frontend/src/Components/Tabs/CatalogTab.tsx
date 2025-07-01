import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CatalogItem } from '../../types/catalogItem';

const mockCatalog: CatalogItem[] = Array.from({ length: 23 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Catalog Item ${i + 1}`,
  description:
    i % 3 === 0 ? 'Common household item used for daily tasks.' : undefined,
  imageUrl:
    i % 2 === 0
      ? `https://via.placeholder.com/300?text=Item+${i + 1}`
      : undefined,
  homeId: 'home123',
  createdBy: `user${(i % 5) + 1}`,
  createdAt: new Date(Date.now() - i * 86400000),
  updatedAt: new Date(Date.now() - (i % 3) * 43200000),
  tags: i % 2 === 0 ? ['food'] : ['tools', 'books'],
}));

const formatDate = (date: Date) =>
  date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

type SortField = 'tags' | 'createdBy' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

const CatalogTab: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedItems = [...mockCatalog].sort((a, b) => {
    let aVal: string | number = '';
    let bVal: string | number = '';

    switch (sortField) {
      case 'tags':
        aVal = a.tags?.[0] || '';
        bVal = b.tags?.[0] || '';
        break;
      case 'createdBy':
        aVal = a.createdBy.toLowerCase();
        bVal = b.createdBy.toLowerCase();
        break;
      case 'createdAt':
        aVal = a.createdAt.getTime();
        bVal = b.createdAt.getTime();
        break;
      case 'updatedAt':
        aVal = a.updatedAt.getTime();
        bVal = b.updatedAt.getTime();
        break;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    } else {
      return sortOrder === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    }
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
          Catalog Items
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
          onClick={() => alert('Open add catalog item modal')}
        >
          Add New Item
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={2} sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell
                sortDirection={sortField === 'tags' ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortField === 'tags'}
                  direction={sortField === 'tags' ? sortOrder : 'asc'}
                  onClick={() => handleSort('tags')}
                >
                  Tags
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortField === 'createdBy' ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortField === 'createdBy'}
                  direction={sortField === 'createdBy' ? sortOrder : 'asc'}
                  onClick={() => handleSort('createdBy')}
                >
                  Created By
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortField === 'createdAt' ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortField === 'createdAt'}
                  direction={sortField === 'createdAt' ? sortOrder : 'asc'}
                  onClick={() => handleSort('createdAt')}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortField === 'updatedAt' ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortField === 'updatedAt'}
                  direction={sortField === 'updatedAt' ? sortOrder : 'asc'}
                  onClick={() => handleSort('updatedAt')}
                >
                  Updated At
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                }}
              >
                <TableCell>
                  <Tooltip title="Click to expand">
                    <IconButton
                      onClick={() => handleImageClick(item.imageUrl || '')}
                    >
                      {item.imageUrl ? (
                        <Avatar
                          alt={item.name}
                          src={item.imageUrl}
                          variant="circular"
                          sx={{ width: 40, height: 40 }}
                        />
                      ) : (
                        <Avatar sx={{ width: 40, height: 40 }}>
                          {item.name[0]}
                        </Avatar>
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.description || <span style={{ color: '#888' }}>—</span>}
                </TableCell>
                <TableCell>
                  {item.tags?.length ? (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                  ) : (
                    <span style={{ color: '#888' }}>—</span>
                  )}
                </TableCell>
                <TableCell>{item.createdBy}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{formatDate(item.updatedAt)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => alert(`Edit catalog item: ${item.name}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => alert(`Delete catalog item: ${item.name}`)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
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

      {/* Image Modal */}
      <Dialog
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Preview
          <IconButton onClick={() => setSelectedImage(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedImage ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={selectedImage}
                alt="Full size"
                style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: 8 }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'gray',
                textAlign: 'center',
                px: 2,
              }}
            >
              <Typography variant="body1">
                No image available.
                <br />
                Click the <strong>Edit</strong> button to add one.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CatalogTab;
