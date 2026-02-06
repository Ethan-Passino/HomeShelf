import React, { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import type { CatalogItem } from '../../types/catalogItem';

const initialCatalog: CatalogItem[] = [
  {
    id: 'milk-1',
    name: 'Whole Milk',
    description: '1 gallon, 2% fat',
    imageUrl: 'https://via.placeholder.com/300?text=Milk',
    homeId: 'home-main',
    createdBy: 'alex',
    createdAt: new Date('2025-06-25T14:00:00Z'),
    updatedAt: new Date('2025-07-02T09:30:00Z'),
    tags: ['food', 'dairy'],
  },
  {
    id: 'beans-1',
    name: 'Black Beans',
    description: 'Canned, low sodium',
    homeId: 'home-main',
    createdBy: 'jamie',
    createdAt: new Date('2025-06-20T12:00:00Z'),
    updatedAt: new Date('2025-07-01T15:00:00Z'),
    tags: ['food', 'pantry'],
  },
  {
    id: 'batteries-1',
    name: 'AA Batteries',
    description: 'Pack of 24',
    imageUrl: 'https://via.placeholder.com/300?text=Batteries',
    homeId: 'grandma-house',
    createdBy: 'alexa',
    createdAt: new Date('2025-06-18T08:00:00Z'),
    updatedAt: new Date('2025-06-28T11:00:00Z'),
    tags: ['tools'],
  },
  {
    id: 'book-1',
    name: 'Cookbook: Quick Meals',
    description: 'Meal prep ideas for the week',
    homeId: 'vacation-house',
    createdBy: 'riley',
    createdAt: new Date('2025-06-10T10:00:00Z'),
    updatedAt: new Date('2025-06-27T10:45:00Z'),
    tags: ['books'],
  },
  {
    id: 'spinach-1',
    name: 'Baby Spinach',
    description: '10 oz clamshell',
    homeId: 'home-main',
    createdBy: 'alex',
    createdAt: new Date('2025-06-29T09:00:00Z'),
    updatedAt: new Date('2025-07-02T08:15:00Z'),
    tags: ['food', 'produce'],
  },
  {
    id: 'sponges-1',
    name: 'Kitchen Sponges',
    description: '6-pack scrub',
    homeId: 'grandma-house',
    createdBy: 'jamie',
    createdAt: new Date('2025-06-15T16:00:00Z'),
    updatedAt: new Date('2025-06-30T12:10:00Z'),
    tags: ['cleaning'],
  },
  {
    id: 'freezer-bags-1',
    name: 'Freezer Bags Gallon',
    description: 'Box of 30',
    homeId: 'vacation-house',
    createdBy: 'alex',
    createdAt: new Date('2025-06-12T15:00:00Z'),
    updatedAt: new Date('2025-06-23T14:00:00Z'),
    tags: ['pantry', 'storage'],
  },
  {
    id: 'coffee-1',
    name: 'Coffee Beans',
    description: 'Medium roast, 2 lb bag',
    imageUrl: 'https://via.placeholder.com/300?text=Coffee',
    homeId: 'home-main',
    createdBy: 'riley',
    createdAt: new Date('2025-06-05T07:00:00Z'),
    updatedAt: new Date('2025-07-01T06:30:00Z'),
    tags: ['food', 'pantry'],
  },
  {
    id: 'thermometer-1',
    name: 'Food Thermometer',
    description: 'Instant read',
    homeId: 'grandma-house',
    createdBy: 'alex',
    createdAt: new Date('2025-06-03T19:00:00Z'),
    updatedAt: new Date('2025-06-20T09:45:00Z'),
    tags: ['tools', 'kitchen'],
  },
  {
    id: 'pasta-1',
    name: 'Whole Wheat Pasta',
    description: 'Rotini, 16 oz',
    homeId: 'vacation-house',
    createdBy: 'jamie',
    createdAt: new Date('2025-06-14T13:00:00Z'),
    updatedAt: new Date('2025-06-29T13:00:00Z'),
    tags: ['food', 'pantry'],
  },
];

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
  const [catalog, setCatalog] = useState<CatalogItem[]>(initialCatalog);
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [search, setSearch] = useState('');
  const [selectedHome, setSelectedHome] = useState<string>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    tags: '',
    imageUrl: '',
    createdBy: '',
    homeId: 'home-main',
  });

  const availableHomes = useMemo(
    () => Array.from(new Set(catalog.map((item) => item.homeId))),
    [catalog]
  );

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    catalog.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [catalog]);

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

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setPage(0);
  };

  const openCreateModal = () => {
    setEditing(null);
    setFormState({
      name: '',
      description: '',
      tags: '',
      imageUrl: '',
      createdBy: '',
      homeId: availableHomes[0] || 'home-main',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CatalogItem) => {
    setEditing(item);
    setFormState({
      name: item.name,
      description: item.description ?? '',
      tags: item.tags?.join(', ') ?? '',
      imageUrl: item.imageUrl ?? '',
      createdBy: item.createdBy,
      homeId: item.homeId,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (itemId: string) => {
    const toDelete = catalog.find((c) => c.id === itemId);
    if (!toDelete) return;
    const confirmed = window.confirm(
      `Delete "${toDelete.name}" from ${toDelete.homeId}?`
    );
    if (confirmed) {
      setCatalog((prev) => prev.filter((item) => item.id !== itemId));
      setPage(0);
    }
  };

  const handleSave = () => {
    if (!formState.name.trim()) {
      alert('Name is required');
      return;
    }

    const parsedTags = formState.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const baseItem: CatalogItem = {
      id: editing?.id ?? `cat-${Date.now()}`,
      name: formState.name.trim(),
      description: formState.description.trim() || undefined,
      imageUrl: formState.imageUrl.trim() || undefined,
      homeId: formState.homeId,
      createdBy: formState.createdBy.trim() || 'you',
      createdAt: editing?.createdAt ?? new Date(),
      updatedAt: new Date(),
      tags: parsedTags.length ? parsedTags : undefined,
    };

    setCatalog((prev) => {
      if (editing) {
        return prev.map((item) => (item.id === editing.id ? baseItem : item));
      }
      return [baseItem, ...prev];
    });

    setIsModalOpen(false);
    setEditing(null);
    setPage(0);
  };

  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      const matchesSearch = [item.name, item.description]
        .filter(Boolean)
        .some((value) =>
          value!.toLowerCase().includes(search.trim().toLowerCase())
        );

      const matchesHome =
        selectedHome === 'all' || item.homeId === selectedHome;

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => item.tags?.includes(tag));

      return matchesSearch && matchesHome && matchesTags;
    });
  }, [catalog, search, selectedHome, activeTags]);

  const sortedItems = [...filteredItems].sort((a, b) => {
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

  const totalCatalog = catalog.length;
  const filteredCount = filteredItems.length;
  const uniqueTags = availableTags.length;

  const lastUpdated = catalog.reduce<Date | null>((latest, item) => {
    if (!latest) return item.updatedAt;
    return item.updatedAt > latest ? item.updatedAt : latest;
  }, null);

  return (
    <Box>
      {/* Header */}
      <Box className="flex items-center justify-between mb-3 flex-wrap gap-3">
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
          onClick={openCreateModal}
        >
          Add New Item
        </Button>
      </Box>

      {/* Quick stats */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Items (filtered / total)
          </Typography>
          <Typography variant="h6">
            {filteredCount} / {totalCatalog}
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Unique Tags
          </Typography>
          <Typography variant="h6">{uniqueTags}</Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Last Updated
          </Typography>
          <Typography variant="h6">
            {lastUpdated ? formatDate(lastUpdated) : 'No items yet'}
          </Typography>
        </Paper>
      </Stack>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
          <TextField
            label="Search name or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Home</InputLabel>
            <Select
              label="Home"
              value={selectedHome}
              onChange={(e) => {
                setSelectedHome(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="all">All homes</MenuItem>
              {availableHomes.map((homeId) => (
                <MenuItem key={homeId} value={homeId}>
                  {homeId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" color="textSecondary" mb={1}>
          Filter by tag
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {availableTags.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No tags yet.
            </Typography>
          )}
          {availableTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <Chip
                key={tag}
                label={tag}
                variant={isActive ? 'filled' : 'outlined'}
                color={isActive ? 'primary' : 'default'}
                onClick={() => toggleTag(tag)}
                clickable
                size="small"
              />
            );
          })}
          {activeTags.length > 0 && (
            <Button
              size="small"
              onClick={() => setActiveTags([])}
              sx={{ textTransform: 'none' }}
            >
              Clear tags
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Table */}
      <Paper elevation={2} sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Home</TableCell>
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
                  <Tooltip title={item.imageUrl ? 'Click to expand' : ''}>
                    <span>
                      <IconButton
                        onClick={() =>
                          item.imageUrl && handleImageClick(item.imageUrl)
                        }
                        disabled={!item.imageUrl}
                        size="small"
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
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.homeId}</TableCell>
                <TableCell>
                  {item.description || <span style={{ color: '#888' }}>-</span>}
                </TableCell>
                <TableCell>
                  {item.tags?.length ? (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                  ) : (
                    <span style={{ color: '#888' }}>-</span>
                  )}
                </TableCell>
                <TableCell>{item.createdBy}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{formatDate(item.updatedAt)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(item)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {paginatedItems.length === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="body2" color="textSecondary">
              No catalog items match your filters yet.
            </Typography>
          </Box>
        )}

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

      {/* Create / Edit Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {editing ? 'Edit Catalog Item' : 'Add Catalog Item'}
          <IconButton onClick={() => setIsModalOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              required
            />
            <TextField
              label="Description"
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
              multiline
              minRows={2}
            />
            <TextField
              label="Tags (comma separated)"
              value={formState.tags}
              onChange={(e) =>
                setFormState({ ...formState, tags: e.target.value })
              }
              placeholder="food, dairy"
            />
            <TextField
              label="Image URL"
              value={formState.imageUrl}
              onChange={(e) =>
                setFormState({ ...formState, imageUrl: e.target.value })
              }
              placeholder="https://..."
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Created By"
                value={formState.createdBy}
                onChange={(e) =>
                  setFormState({ ...formState, createdBy: e.target.value })
                }
                sx={{ flex: 1 }}
              />
              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel>Home</InputLabel>
                <Select
                  label="Home"
                  value={formState.homeId}
                  onChange={(e) =>
                    setFormState({ ...formState, homeId: e.target.value })
                  }
                >
                  {availableHomes.map((homeId) => (
                    <MenuItem key={homeId} value={homeId}>
                      {homeId}
                    </MenuItem>
                  ))}
                  {!availableHomes.includes(formState.homeId) && (
                    <MenuItem value={formState.homeId}>
                      {formState.homeId}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
                pt: 1,
              }}
            >
              <Button onClick={() => setIsModalOpen(false)} color="inherit">
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                {editing ? 'Save changes' : 'Add item'}
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CatalogTab;
