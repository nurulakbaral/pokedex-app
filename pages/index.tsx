import * as React from 'react'
import { AppBar, Button, Toolbar, Box, Typography, Grid2 as Grid } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { I18nMenu } from '~/src/features/i18n/i18n-menu'
import { Banner, BannerPokedex, BannerPagination, useStorePagination } from '~/src/features/banner'
import { httpRequest } from '~/src/libraries/http-request'
import { BannerPokedexSkeleton } from '~/src/features/banner/banner-pokedex-skeleton'
import { Show } from '~/src/components/base/Show'
import { useTranslations } from '~/src/components/hooks/use-translations'

export interface TResponsePokemonList {
  count: number
  next: string
  previous: string
  results: Array<{
    name: string
    url: string
  }>
}

export function useRequestPokemonList() {
  const { page, perPage } = useStorePagination()

  return useQuery({
    queryKey: ['homePokemonList', page * perPage, perPage],
    queryFn: async ({ queryKey }) =>
      httpRequest.get<TResponsePokemonList>(`/pokemon?offset=${queryKey[1]}}&limit=${queryKey[2]}`).then((res) => ({
        totalData: res.data.count,
        pokemonList: res.data.results,
      })),
  })
}

export default function Home() {
  const t = useTranslations()
  const { data: pokemonListData, ...pokemonListRes } = useRequestPokemonList()

  return (
    <section>
      <Head>
        <title>Home</title>
        <link rel='shortcut icon' href='https://assets.pokemon.com/static2/_ui/img/favicon.ico' />
      </Head>

      <Box paddingX={16}>
        <AppBar position='relative' className='py-4' color='transparent' elevation={0}>
          <Toolbar className='gap-9'>
            <Image priority width={170} height={60} alt='Pokemon Logo' src='/logos/pokemon-logo.png' />

            <Link href='/'>
              <Button className='normal-case font-medium' size='large' disableRipple>
                {t.NavigationMenu.Home}
              </Button>
            </Link>

            <Link href='/pokemon-type'>
              <Button className='normal-case font-medium' size='large' disableRipple>
                {t.NavigationMenu.PokemonType}
              </Button>
            </Link>

            <I18nMenu flexGrow={1} />
          </Toolbar>
        </AppBar>

        <Banner />
      </Box>

      <div className='bg-pokedex-yellow py-10'>
        <Typography className='text-4xl' textAlign='center' variant='h6' fontWeight={'bold'}>
          PokèDex
        </Typography>

        <Typography className='mt-4' textAlign='center' variant='body1'>
          {t.Footer.WordingGeneration}
        </Typography>

        <Typography textAlign='center' variant='body1'>
          {pokemonListData?.totalData} Pokemon
        </Typography>

        <div className='px-10 mt-10'>
          <Show when={pokemonListRes.isLoading}>
            <BannerPokedexSkeleton />
          </Show>

          <Show when={!pokemonListRes.isLoading}>
            <Grid justifyContent='center' container spacing={2}>
              {pokemonListData?.pokemonList.map((pokemon, index) => (
                <Grid key={pokemon.name} display='flex' justifyContent='center' alignItems='center' size={4}>
                  <BannerPokedex index={index} pokemonDetail={pokemon} />
                </Grid>
              ))}
            </Grid>
          </Show>
        </div>

        <Box mt={12} mb={10} display='flex' justifyContent='center'>
          <BannerPagination />
        </Box>
      </div>
    </section>
  )
}
