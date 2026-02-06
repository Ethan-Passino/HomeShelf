import React, { useMemo, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

export type SortOrder = "asc" | "desc";

export type Column<T> = {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  width?: number | string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number | Date | null | undefined;
};

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId?: (row: T, index: number) => string | number;
  getRowProps?: (row: T, index: number) => { sx?: SxProps<Theme> };
  initialSort?: { columnId: string; order: SortOrder };
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  emptyMessage?: string;
  striped?: boolean;
  stripedColors?: [string, string];
};

const toComparable = (value: unknown): string | number => {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  return String(value).toLowerCase();
};

function DataTable<T extends Record<string, unknown>>({
  rows,
  columns,
  getRowId,
  getRowProps,
  initialSort,
  defaultRowsPerPage = 10,
  rowsPerPageOptions,
  emptyMessage = "No records found.",
  striped = true,
  stripedColors = ["white", "#fafafa"],
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortState, setSortState] = useState<{
    columnId: string;
    order: SortOrder;
  } | null>(initialSort ?? null);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    setPage(0);
    setSortState((prev) => {
      if (prev?.columnId === column.id) {
        const nextOrder = prev.order === "asc" ? "desc" : "asc";
        return { columnId: column.id, order: nextOrder };
      }
      return { columnId: column.id.toString(), order: "asc" };
    });
  };

  const sortedRows = useMemo(() => {
    if (!sortState) return rows;
    const column = columns.find((c) => c.id === sortState.columnId);
    if (!column || !column.sortable) return rows;

    return [...rows].sort((a, b) => {
      const colKey = column.id;
      const aVal = toComparable(
        column.sortValue ? column.sortValue(a) : (a as Record<string, unknown>)[colKey]
      );
      const bVal = toComparable(
        column.sortValue ? column.sortValue(b) : (b as Record<string, unknown>)[colKey]
      );

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortState.order === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortState.order === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [rows, columns, sortState]);

  const paginatedRows = useMemo(
    () =>
      sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedRows, page, rowsPerPage]
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  return (
    <Paper elevation={2} sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f5f7fb",
              "& th": {
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.02em",
                color: "#1f2937",
                whiteSpace: "nowrap",
              },
            }}
          >
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align}
                style={{ width: col.width }}
                sortDirection={
                  sortState?.columnId === col.id ? sortState.order : false
                }
              >
                {col.sortable ? (
                  <Tooltip title="Click to sort" arrow>
                    <TableSortLabel
                      active={sortState?.columnId === col.id}
                      direction={
                        sortState?.columnId === col.id
                          ? sortState.order
                          : "asc"
                      }
                      onClick={() => handleSort(col)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, index) => {
            const rowId = getRowId ? getRowId(row, index) : index;
            const rowProps = getRowProps ? getRowProps(row, index) : {};
            const rowSx = (rowProps as { sx?: SxProps<Theme> }).sx;
            const baseSx =
              striped && !(rowSx && typeof rowSx === "object" && "backgroundColor" in rowSx)
                ? { backgroundColor: index % 2 === 0 ? stripedColors[0] : stripedColors[1] }
                : {};
            const mergedSx =
              typeof rowSx === "function"
                ? rowSx
                : { ...baseSx, ...(rowSx as Record<string, unknown> | undefined) };
            return (
              <TableRow key={rowId as React.Key} {...rowProps} sx={mergedSx}>
                {columns.map((col) => {
                  const colKey = col.id;
                  const fallbackValue = (row as Record<string, unknown>)[colKey];
                  const cellValue =
                    col.render && col.render(row) !== undefined
                      ? col.render(row)
                      : fallbackValue === undefined || fallbackValue === null
                        ? "-"
                        : String(fallbackValue);
                  return (
                    <TableCell key={col.id as React.Key} align={col.align}>
                      {cellValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {paginatedRows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions ?? [rowsPerPage]}
      />
    </Paper>
  );
}

export default DataTable;
