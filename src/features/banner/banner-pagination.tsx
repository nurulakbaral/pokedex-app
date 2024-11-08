import * as React from 'react'
import { type BoxProps, Box, Button, Menu, MenuItem, Pagination, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

/**
 * =======================================
 * Pagination Per Page
 * ========================================
 */

interface TPaginationPerPageProps extends BoxProps {}

export function PaginationPerPage({ ...props }: TPaginationPerPageProps) {
  const [selectedLang, setSelectedLang] = React.useState<'en' | 'id'>('en')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(lang: 'en' | 'id') {
    return () => {
      setSelectedLang(lang)
      setAnchorEl(null)
    }
  }

  return (
    <Box display='flex' justifyContent='flex-end' {...props}>
      <Button endIcon={<ExpandMore />} className='normal-case text-pokedex-grey' onClick={handleClick} color='inherit'>
        9
      </Button>

      <Menu
        slotProps={{
          paper: {
            sx: {
              minWidth: 44,
            },
          },
        }}
        elevation={1}
        id='internationalization-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'internationalization-menu',
        }}
      >
        <MenuItem onClick={handleClose('en')}>10</MenuItem>
        <MenuItem onClick={handleClose('id')}>20</MenuItem>
      </Menu>
    </Box>
  )
}

/**
 * =======================================
 * @MainComponent Banner Pagination
 * ========================================
 */

interface TBannerPaginationProps extends BoxProps {}

export function BannerPagination({ ...props }: TBannerPaginationProps) {
  return (
    <Box display='flex' justifyContent='space-between' gap={12} alignItems='center' {...props}>
      <PaginationPerPage />

      <Pagination count={10} variant='outlined' shape='rounded' showFirstButton showLastButton />

      <Typography>Total Data: 999</Typography>
    </Box>
  )
}
