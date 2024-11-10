import * as React from 'react'
import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import { Banner } from '~/src/features/banner'
import { useTranslations } from '~/src/components/hooks/use-translations'
import { NavigationTop } from '~/src/features/navigation/navigation-top'
import { PokemonTypeList } from '~/src/features/pokemon-type/pokemon-type-list'
import { PokemonList } from '~/src/features/pokemon-type/pokemon-list'

export interface TResponsePokemonList {
  count: number
  next: string
  previous: string
  results: Array<{
    name: string
    url: string
  }>
}

/**
 * =======================================
 * @Layout Page
 * ========================================
 */

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

        <Box mt={16} display='flex' justifyContent='flex-start' gap={6}>
          <Box borderRight='2px solid #F2F2F2'>
            <Typography className='text-xl' variant='h6' fontWeight={'bold'}>
              {t.PokemonType.TypeTitle}
            </Typography>

            <PokemonTypeList />
          </Box>

          <Box flexGrow={1}>
            <PokemonList />
          </Box>
        </Box>
      </Box>
    </section>
  )
}
