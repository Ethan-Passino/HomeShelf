import React from "react";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type HomeFilterProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

type TagFilterProps = {
  options: string[];
  active: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
  label?: string;
};

type SelectOption = { value: string; label: string };

type SelectFilterProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export type TableFiltersProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  homeFilter?: HomeFilterProps;
  tagFilter?: TagFilterProps;
  elevation?: number;
  selectFilters?: SelectFilterProps[];
};

const TableFilters: React.FC<TableFiltersProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  homeFilter,
  tagFilter,
  elevation = 0,
  selectFilters = [],
}) => {
  const showTags = Boolean(tagFilter && tagFilter.options.length);
  const showHome = Boolean(homeFilter);
   const showSelects = selectFilters.length > 0;

  return (
    <Paper
      elevation={elevation}
      sx={{
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={showTags ? 2 : 0}>
        <TextField
          label={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
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

        {showHome && homeFilter && (
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>{homeFilter.label ?? "Home"}</InputLabel>
            <Select
              label={homeFilter.label ?? "Home"}
              value={homeFilter.value}
              onChange={(e) => homeFilter.onChange(e.target.value)}
            >
              <MenuItem value="all">All homes</MenuItem>
              {homeFilter.options.map((homeId) => (
                <MenuItem key={homeId} value={homeId}>
                  {homeId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {showSelects &&
          selectFilters.map((select) => (
            <FormControl key={select.label} size="small" sx={{ minWidth: 180 }}>
              <InputLabel>{select.label}</InputLabel>
              <Select
                label={select.label}
                value={select.value}
                onChange={(e) => select.onChange(e.target.value)}
              >
                {select.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
      </Stack>

      {showTags && tagFilter && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="textSecondary" mb={1}>
            {tagFilter.label ?? "Filter by tag"}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {tagFilter.options.map((tag) => {
              const isActive = tagFilter.active.includes(tag);
              return (
                <Chip
                  key={tag}
                  label={tag}
                  variant={isActive ? "filled" : "outlined"}
                  color={isActive ? "primary" : "default"}
                  onClick={() => tagFilter.onToggle(tag)}
                  clickable
                  size="small"
                />
              );
            })}
            {tagFilter.active.length > 0 && (
              <Button
                size="small"
                onClick={tagFilter.onClear}
                sx={{ textTransform: "none" }}
              >
                Clear tags
              </Button>
            )}
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default TableFilters;
