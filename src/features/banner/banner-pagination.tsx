import * as React from 'react'
import { type BoxProps, Box, Button, Menu, MenuItem, Pagination, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { useRequestPokemonList } from '~/pages'
import { create } from 'zustand'

/**
 * =======================================
 * Store
 * ========================================
 */

export const useStorePagination = create<{
  page: number
  perPage: number
  setPagination: (page: number, perPage: number) => void
}>((set) => ({
  page: 1,
  perPage: 10,
  setPagination: (page: number, perPage: number) => set({ page, perPage }),
}))

/**
 * =======================================
 * Pagination Per Page
 * ========================================
 */

interface TPaginationPerPageProps extends BoxProps {}

export function PaginationPerPage({ ...props }: TPaginationPerPageProps) {
  const { page, perPage, setPagination } = useStorePagination()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box display='flex' justifyContent='flex-end' {...props}>
      <Button variant='outlined' endIcon={<ExpandMore />} className='normal-case text-black' onClick={handleClick}>
        {perPage}
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
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'internationalization-menu',
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            setPagination(page, 5)
          }}
        >
          5
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            setPagination(page, 10)
          }}
        >
          10
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            setPagination(page, 20)
          }}
        >
          20
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            setPagination(page, 50)
          }}
        >
          50
        </MenuItem>
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
  const { perPage, setPagination } = useStorePagination()
  const { data: pokemonListData } = useRequestPokemonList()

  return (
    <Box display='flex' justifyContent='space-between' gap={12} alignItems='center' {...props}>
      <PaginationPerPage />

      <Pagination
        onChange={(_, page) => setPagination(page, perPage)}
        count={Math.ceil(Number(pokemonListData?.totalData) / perPage)}
        variant='outlined'
        shape='rounded'
        showFirstButton
        showLastButton
      />

      <Typography>Total Data: {pokemonListData?.totalData}</Typography>
    </Box>
  )
}
