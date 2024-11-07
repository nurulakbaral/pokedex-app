import '~/src/assets/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from '~/src/configs/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
