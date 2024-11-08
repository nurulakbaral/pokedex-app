import { createTheme } from '@mui/material/styles'

import { Palette, PaletteOptions } from '@mui/material/styles/createPalette'

// Extend the types to include custom colors
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    ochre: Palette['primary'] // Add a custom color similar to the primary structure
  }
  interface PaletteOptions {
    ochre?: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#E6AB09',
    },
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
})
