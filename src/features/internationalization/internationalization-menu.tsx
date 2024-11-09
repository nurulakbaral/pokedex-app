import * as React from 'react'
import { Box, Button, Menu, MenuItem, type BoxProps } from '@mui/material'
import { Language, ExpandMore } from '@mui/icons-material'

/**
 * =======================================
 * @MainComponent Internationalization Menu
 * ========================================
 */

interface TInternationalizationMenuProps extends BoxProps {}

export function InternationalizationMenu({ ...props }: TInternationalizationMenuProps) {
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
      <Button
        className='normal-case text-pokedex-grey min-w-36'
        onClick={handleClick}
        color='inherit'
        startIcon={<Language />}
        endIcon={<ExpandMore />}
      >
        {selectedLang === 'en' ? 'English' : 'Indonesia'}
      </Button>

      <Menu
        slotProps={{
          paper: {
            sx: {
              minWidth: 160,
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
        <MenuItem onClick={handleClose('en')}>English</MenuItem>
        <MenuItem onClick={handleClose('id')}>Indonesia</MenuItem>
      </Menu>
    </Box>
  )
}
