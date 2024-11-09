import * as React from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import { Banner } from '~/src/features/banner'
import { useTranslations } from '~/src/components/hooks/use-translations'
import { NavigationTop } from '~/src/features/navigation/navigation-top'

export interface TResponsePokemonList {
  count: number
  next: string
  previous: string
  results: Array<{
    name: string
    url: string
  }>
}

export default function PokemonTypePage() {
  const t = useTranslations()

  return (
    <section>
      <Head>
        <title>Home</title>
        <link rel='shortcut icon' href='https://assets.pokemon.com/static2/_ui/img/favicon.ico' />
      </Head>

      <Box paddingX={16}>
        <NavigationTop />
      </Box>
    </section>
  )
}
