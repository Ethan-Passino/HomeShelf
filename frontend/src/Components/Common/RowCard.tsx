import React from 'react';
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material';

export type RowCardDetail = { label: string; value: ReactNode };

export type RowCardProps = {
  overline?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  media?: ReactNode;
  statusChip?: ReactNode;
  tags?: ReactNode;
  details?: RowCardDetail[];
  footer?: ReactNode;
  actions?: ReactNode;
  highlightColor?: string;
  sx?: SxProps<Theme>;
};

/**
 * Generic, lightweight card used to render table rows on small screens.
 * Keeps a consistent header/body/footer structure across tabs.
 */
const RowCard: React.FC<RowCardProps> = ({
  overline,
  title,
  subtitle,
  media,
  statusChip,
  tags,
  details,
  footer,
  actions,
  highlightColor,
  sx,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 1.5,
        border: '1px solid',
        borderColor: highlightColor ?? '#e5e7eb',
        borderLeftWidth: 4,
        borderLeftColor: highlightColor ?? 'transparent',
        borderRadius: 2,
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
        ...sx,
      }}
    >
      {media && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {typeof media === 'string' ? (
            <Avatar
              src={media}
              alt={typeof title === 'string' ? title : undefined}
            />
          ) : (
            media
          )}
        </Box>
      )}

      <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {overline && (
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', display: 'block' }}
              >
                {overline}
              </Typography>
            )}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {subtitle}
              </Typography>
            )}
          </Box>
          {statusChip}
        </Stack>

        {tags}

        {details && details.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 1,
            }}
          >
            {details.map((item) => (
              <Box key={String(item.label)}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {(footer || actions) && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {footer}
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {actions}
            </Box>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default RowCard;
