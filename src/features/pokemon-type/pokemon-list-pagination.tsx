import * as React from 'react'
import { type BoxProps, Box, Button, Menu, MenuItem, Pagination, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { create } from 'zustand'
import { TPokemonListCardProps } from './pokemon-list'

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
 * @MainComponent Pokemon List Pagination
 * ========================================
 */

interface TPokemonListPaginationProps extends BoxProps {
  pokemonList: Array<TPokemonListCardProps['pokemonDetail']>
  callbackGetPokemonList: React.Dispatch<React.SetStateAction<Array<TPokemonListCardProps['pokemonDetail']>>>
}

export function PokemonListPagination({ pokemonList, callbackGetPokemonList, ...props }: TPokemonListPaginationProps) {
  const { page, perPage, setPagination } = useStorePagination()

  React.useEffect(() => {
    const startIdx = (page - 1) * perPage
    const endIdx = startIdx + perPage
    const paginatedData = pokemonList.slice(startIdx, endIdx)
    callbackGetPokemonList(paginatedData)
  }, [page, perPage, pokemonList, callbackGetPokemonList])

  React.useEffect(() => {
    setPagination(1, perPage)
  }, [perPage, setPagination])

  return (
    <Box mt={8} pb={8} display='flex' justifyContent='space-between' gap={12} alignItems='center' {...props}>
      <PaginationPerPage />

      <Pagination
        onChange={(_, page) => setPagination(page, perPage)}
        page={page}
        count={Math.ceil(pokemonList.length / perPage)}
        variant='outlined'
        shape='rounded'
        showFirstButton
        showLastButton
      />

      <Typography>Total Data: {pokemonList?.length}</Typography>
    </Box>
  )
}
