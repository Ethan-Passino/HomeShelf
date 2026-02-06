import React, { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../Common/DataTable';
import TableFilters from '../Common/TableFilters';
import type { Column } from '../Common/DataTable';
import type { CatalogItem } from '../../../../backend/src/schemas/catalog';
import RowCard from '../Common/RowCard';

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

type CatalogFormState = {
  name: string;
  description: string;
  tags: string;
  imageUrl: string;
  createdBy: string;
  homeId: string;
};

const CatalogTab: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>(initialCatalog);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedHome, setSelectedHome] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [formState, setFormState] = useState<CatalogFormState>({
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
    catalog.forEach((item) =>
      item.tags?.forEach((tag: string) => tagSet.add(tag))
    );
    return Array.from(tagSet).sort();
  }, [catalog]);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
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
        selectedTag === 'all' || (item.tags && item.tags.includes(selectedTag));

      return matchesSearch && matchesHome && matchesTags;
    });
  }, [catalog, search, selectedHome, selectedTag]);

  const totalCatalog = catalog.length;
  const filteredCount = filteredItems.length;
  const uniqueTags = availableTags.length;

  const lastUpdated = catalog.reduce<Date | null>((latest, item) => {
    if (!latest) return item.updatedAt;
    return item.updatedAt > latest ? item.updatedAt : latest;
  }, null);

  const columns: Column<CatalogItem>[] = [
    {
      id: 'image',
      label: 'Image',
      width: 80,
      render: (item) => (
        <Tooltip title={item.imageUrl ? 'Click to expand' : ''}>
          <span>
            <IconButton
              onClick={() => item.imageUrl && handleImageClick(item.imageUrl)}
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
                <Avatar sx={{ width: 40, height: 40 }}>{item.name[0]}</Avatar>
              )}
            </IconButton>
          </span>
        </Tooltip>
      ),
    },
    {
      id: 'name',
      label: 'Name',
      sortable: true,
      sortValue: (item) => item.name,
    },
    {
      id: 'homeId',
      label: 'Home',
      sortable: true,
      sortValue: (item) => item.homeId,
    },
    {
      id: 'description',
      label: 'Description',
      render: (item) =>
        item.description || <span style={{ color: '#888' }}>-</span>,
    },
    {
      id: 'tags',
      label: 'Tags',
      sortable: true,
      sortValue: (item) => item.tags?.[0] ?? '',
      render: (item) =>
        item.tags?.length ? (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {item.tags.map((tag: string) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        ) : (
          <span style={{ color: '#888' }}>-</span>
        ),
    },
    {
      id: 'createdBy',
      label: 'Created By',
      sortable: true,
      sortValue: (item) => item.createdBy.toLowerCase(),
    },
    {
      id: 'createdAt',
      label: 'Created At',
      sortable: true,
      sortValue: (item) => item.createdAt,
      render: (item) => formatDate(item.createdAt),
    },
    {
      id: 'updatedAt',
      label: 'Updated At',
      sortable: true,
      sortValue: (item) => item.updatedAt,
      render: (item) => formatDate(item.updatedAt),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      render: (item) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => openEditModal(item)}>
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
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box className="flex items-center justify-between mb-4 flex-wrap gap-3">
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
      <TableFilters
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search name or description"
        homeFilter={{
          options: availableHomes,
          value: selectedHome,
          onChange: setSelectedHome,
        }}
        selectFilters={[
          {
            label: 'Tag',
            value: selectedTag,
            onChange: (val) => setSelectedTag(val),
            options: [
              { value: 'all', label: 'All tags' },
              ...availableTags.map((tag: string) => ({
                value: tag,
                label: tag,
              })),
            ],
          },
        ]}
      />

      <DataTable
        rows={filteredItems}
        columns={columns}
        initialSort={{ columnId: 'updatedAt', order: 'asc' }}
        defaultRowsPerPage={7}
        rowsPerPageOptions={[7]}
        getRowId={(row) => row.id}
        emptyMessage="No catalog items match your filters yet."
        stripedColors={['white', '#fafafa']}
        renderCard={(item) => {
          const avatarNode = item.imageUrl ? (
            <Avatar
              alt={item.name}
              src={item.imageUrl}
              variant="rounded"
              sx={{ width: 56, height: 56, borderRadius: 2 }}
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{ width: 56, height: 56, borderRadius: 2 }}
            >
              {item.name[0]}
            </Avatar>
          );

          return (
            <RowCard
              overline="Catalog"
              title={item.name}
              subtitle={item.description || 'No description'}
              media={avatarNode}
              tags={
                item.tags?.length ? (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {item.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    No tags
                  </Typography>
                )
              }
              details={[
                { label: 'Home', value: item.homeId },
                { label: 'Created By', value: item.createdBy },
                { label: 'Created', value: formatDate(item.createdAt) },
                { label: 'Updated', value: formatDate(item.updatedAt) },
              ]}
              actions={
                <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                </Box>
              }
            />
          );
        }}
        cardBreakpoint="sm"
      />

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
