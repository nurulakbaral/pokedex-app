import * as React from 'react'
import { AppBar, Button, Toolbar, Box, Typography, Grid2 as Grid } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { InternationalizationMenu } from '~/src/features/internationalization/internationalization-menu'
import { Banner, BannerPokedex, BannerPagination } from '~/src/features/banner'
import { httpRequest } from '~/src/libraries/http-request'

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
  return useQuery({
    queryKey: ['homePokemonList'],
    queryFn: async () =>
      httpRequest.get<TResponsePokemonList>('/pokemon?offset=10&limit=10').then((res) => ({
        totalData: res.data.count,
        pokemonList: res.data.results,
      })),
  })
}

export default function Home() {
  const { data } = useRequestPokemonList()

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
                Home
              </Button>
            </Link>

            <Link href='/pokemon-type'>
              <Button className='normal-case font-medium' size='large' disableRipple>
                Pokemon Type
              </Button>
            </Link>

            <InternationalizationMenu flexGrow={1} />
          </Toolbar>
        </AppBar>

        <Banner />
      </Box>

      <div className='bg-pokedex-yellow py-10'>
        <Typography className='text-4xl' textAlign='center' variant='h6' fontWeight={'bold'}>
          PokèDex
        </Typography>

        <Typography className='mt-4' textAlign='center' variant='body1'>
          All Generation Totaling
        </Typography>

        <Typography textAlign='center' variant='body1'>
          {data?.totalData} Pokemon
        </Typography>

        <div className='px-10 mt-10'>
          <Grid justifyContent='center' container spacing={2}>
            {data?.pokemonList.map((pokemon, index) => (
              <Grid key={pokemon.name} display='flex' justifyContent='center' alignItems='center' size={4}>
                <BannerPokedex index={index} pokemonDetail={pokemon} />
              </Grid>
            ))}
          </Grid>
        </div>

        <Box mt={12} mb={10} display='flex' justifyContent='center'>
          <BannerPagination />
        </Box>
      </div>
    </section>
  )
}
