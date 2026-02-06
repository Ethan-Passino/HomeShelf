import React, { useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "../Common/DataTable";
import TableFilters from "../Common/TableFilters";
import type { Column } from "../Common/DataTable";
import type { InventoryItem } from "../../types/inventoryItem";

type InventoryRow = InventoryItem & {
  itemName: string;
  isExpired: boolean;
  isExpiringSoon: boolean;
};

const mockInventory: InventoryItem[] = [
  {
    id: "inv-001",
    homeId: "home-main",
    catalogItemId: "milk-1",
    quantity: 1,
    location: "Fridge",
    expirationDate: "2026-02-12",
    notes: "For breakfasts",
    createdAt: new Date("2026-02-01T09:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-05T09:15:00Z").toISOString(),
  },
  {
    id: "inv-002",
    homeId: "home-main",
    catalogItemId: "spinach-1",
    quantity: 2,
    location: "Fridge",
    expirationDate: "2026-02-09",
    notes: "Use for salads",
    createdAt: new Date("2026-02-02T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-05T08:45:00Z").toISOString(),
  },
  {
    id: "inv-003",
    homeId: "home-main",
    catalogItemId: "coffee-1",
    quantity: 1,
    location: "Pantry",
    expirationDate: "2026-08-01",
    notes: "Medium roast",
    createdAt: new Date("2026-01-25T12:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-04T07:20:00Z").toISOString(),
  },
  {
    id: "inv-004",
    homeId: "home-main",
    catalogItemId: "beans-1",
    quantity: 6,
    location: "Pantry",
    expirationDate: "2027-01-15",
    notes: "Low sodium cans",
    createdAt: new Date("2026-01-30T15:30:00Z").toISOString(),
    updatedAt: new Date("2026-02-05T06:55:00Z").toISOString(),
  },
  {
    id: "inv-005",
    homeId: "vacation-house",
    catalogItemId: "pasta-1",
    quantity: 3,
    location: "Pantry",
    expirationDate: "2027-05-10",
    notes: "",
    createdAt: new Date("2026-01-12T18:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-03T14:10:00Z").toISOString(),
  },
  {
    id: "inv-006",
    homeId: "grandma-house",
    catalogItemId: "batteries-1",
    quantity: 18,
    location: "Garage",
    expirationDate: "2029-12-31",
    notes: "AA pack",
    createdAt: new Date("2026-01-20T11:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-02T16:40:00Z").toISOString(),
  },
  {
    id: "inv-007",
    homeId: "vacation-house",
    catalogItemId: "freezer-bags-1",
    quantity: 1,
    location: "Pantry",
    expirationDate: "",
    notes: "Half box left",
    createdAt: new Date("2026-01-05T09:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-01T09:00:00Z").toISOString(),
  },
  {
    id: "inv-008",
    homeId: "home-main",
    catalogItemId: "thermometer-1",
    quantity: 1,
    location: "Kitchen Drawer",
    expirationDate: "",
    notes: "Check battery yearly",
    createdAt: new Date("2025-12-20T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-01-28T10:00:00Z").toISOString(),
  },
  {
    id: "inv-009",
    homeId: "home-main",
    catalogItemId: "sponges-1",
    quantity: 4,
    location: "Under Sink",
    expirationDate: "",
    notes: "Swap weekly",
    createdAt: new Date("2026-02-03T13:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-05T07:45:00Z").toISOString(),
  },
  {
    id: "inv-010",
    homeId: "home-main",
    catalogItemId: "book-1",
    quantity: 1,
    location: "Bookshelf",
    expirationDate: "",
    notes: "Reference for meal prep",
    createdAt: new Date("2025-11-15T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-01-10T08:00:00Z").toISOString(),
  },
  {
    id: "inv-011",
    homeId: "home-main",
    catalogItemId: "spinach-1",
    quantity: 1,
    location: "Fridge",
    expirationDate: "2026-02-03", // expired relative to Feb 6, 2026
    notes: "Leftover pack",
    createdAt: new Date("2026-01-30T09:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-04T09:00:00Z").toISOString(),
  },
  {
    id: "inv-012",
    homeId: "grandma-house",
    catalogItemId: "milk-1",
    quantity: 1,
    location: "Fridge",
    expirationDate: "2026-02-01", // expired relative to Feb 6, 2026
    notes: "Check smell",
    createdAt: new Date("2026-01-25T07:30:00Z").toISOString(),
    updatedAt: new Date("2026-02-02T07:30:00Z").toISOString(),
  },
];

const catalogMap = new Map<string, string>(
  mockInventory.map((item) => [item.catalogItemId, `Item ${item.catalogItemId.slice(7)}`])
);

const InventoryTab: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "expired" | "soon" | "fresh">(
    "all"
  );
  const rows: InventoryRow[] = useMemo(() => {
    const now = new Date();
    return mockInventory.map((item) => {
      const expDate = item.expirationDate ? new Date(item.expirationDate) : null;
      const isExpired = expDate ? expDate < now : false;
      const isExpiringSoon =
        expDate && !isExpired ? expDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000 : false;

      return {
        ...item,
        itemName: catalogMap.get(item.catalogItemId) ?? "Unknown",
        isExpired,
        isExpiringSoon,
      };
    });
  }, []);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const needle = search.toLowerCase();
    const byText = rows.filter((row) =>
      [row.itemName, row.location, row.notes ?? ""].some((field) =>
        field && String(field).toLowerCase().includes(needle)
      )
    );

    const byStatus = byText.filter((row) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "expired") return row.isExpired;
      if (statusFilter === "soon") return row.isExpiringSoon && !row.isExpired;
      return !row.isExpired && !row.isExpiringSoon; // fresh
    });

    return byStatus;
  }, [rows, search, statusFilter]);

  const columns: Column<InventoryRow>[] = [
    {
      id: "itemName",
      label: "Item Name",
      sortable: true,
      sortValue: (row) => row.itemName,
    },
    {
      id: "location",
      label: "Location",
      sortable: true,
      sortValue: (row) => row.location,
    },
    {
      id: "quantity",
      label: "Quantity",
      align: "right",
      sortable: true,
      sortValue: (row) => row.quantity,
    },
    {
      id: "expirationDate",
      label: "Expiration",
      sortable: true,
      sortValue: (row) => (row.expirationDate ? new Date(row.expirationDate) : null),
      render: (row) => {
        if (!row.expirationDate) return "-";
        const color = row.isExpired ? "error.main" : row.isExpiringSoon ? "warning.main" : "text.primary";
        const weight = row.isExpired || row.isExpiringSoon ? 700 : 400;
        const title = row.isExpired ? "Expired" : row.isExpiringSoon ? "Expiring soon" : "";
        return (
          <Tooltip title={title}>
            <Typography sx={{ color, fontWeight: weight }}>
              {row.expirationDate}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      id: "notes",
      label: "Notes",
      render: (row) => row.notes || "-",
    },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => alert(`Edit item: ${row.itemName}`)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => alert(`Delete item: ${row.itemName}`)}
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
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h6" color="primary">
          Inventory Items
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            boxShadow: 2,
            px: 2.5,
            py: 1,
            borderRadius: 2,
          }}
          onClick={() => alert("Open add item modal")}
        >
          Add New Item
        </Button>
      </Box>

      <TableFilters
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search name, location, notes"
        elevation={0}
        selectFilters={[
          {
            label: "Status",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val as "all" | "expired" | "soon" | "fresh"),
            options: [
              { value: "all", label: "All" },
              { value: "expired", label: "Expired" },
              { value: "soon", label: "Expiring soon" },
              { value: "fresh", label: "Fresh" },
            ],
          },
        ]}
      />

      <DataTable
        rows={filteredRows}
        columns={columns}
        initialSort={{ columnId: "expirationDate", order: "asc" }}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.id}
        getRowProps={(row) => ({
          sx: row.isExpired ? { backgroundColor: "#ffebee" } : {},
        })}
        stripedColors={["white", "#fafafa"]}
      />
    </Box>
  );
};

export default InventoryTab;
