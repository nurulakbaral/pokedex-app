import '~/src/assets/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from '~/src/configs/theme'
import CssBaseline from '@mui/material/CssBaseline'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
