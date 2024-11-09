import '~/src/assets/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from '~/src/configs/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  )
}
