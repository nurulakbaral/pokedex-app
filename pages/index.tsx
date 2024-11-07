import * as React from 'react'
import { AppBar, Button, Toolbar, Box, Typography, Grid2 as Grid } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { InternationalizationMenu } from '~/src/features/internationalization/internationalization-menu'
import { Banner } from '~/src/features/banner'
import { BannerPokedex } from '~/src/features/banner/banner-pokedex'

export default function Home() {
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
          99999 Pokemon
        </Typography>

        <div className='px-10 mt-10'>
          <Grid justifyContent='center' container spacing={2}>
            <Grid display='flex' justifyContent='center' alignItems='center' size='grow'>
              <BannerPokedex />
            </Grid>
            <Grid display='flex' justifyContent='center' alignItems='center' size='grow'>
              <BannerPokedex />
            </Grid>
            <Grid display='flex' justifyContent='center' alignItems='center' size='grow'>
              <BannerPokedex />
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  )
}
