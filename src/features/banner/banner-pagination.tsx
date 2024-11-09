import * as React from 'react'
import { type BoxProps, Box, Button, Menu, MenuItem, Pagination, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { useRequestPokemonList } from '~/pages'

/**
 * =======================================
 * Pagination Per Page
 * ========================================
 */

interface TPaginationPerPageProps extends BoxProps {}

export function PaginationPerPage({ ...props }: TPaginationPerPageProps) {
  const { data } = useRequestPokemonList()
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
      <Button variant='outlined' endIcon={<ExpandMore />} className='normal-case text-black' onClick={handleClick}>
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
        onClose={handleClose('en')}
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
  const { data } = useRequestPokemonList()

  return (
    <Box display='flex' justifyContent='space-between' gap={12} alignItems='center' {...props}>
      <PaginationPerPage />

      <Pagination count={10} variant='outlined' shape='rounded' showFirstButton showLastButton />

      <Typography>Total Data: {data?.totalData}</Typography>
    </Box>
  )
}
