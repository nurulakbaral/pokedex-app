import * as React from 'react'
import { AppBar, Button, Toolbar, Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { InternationalizationMenu } from '~/src/features/internationalization/internationalization-menu'

export default function Home() {
  return (
    <section>
      <Head>
        <title>Home</title>
        <link rel='shortcut icon' href='https://assets.pokemon.com/static2/_ui/img/favicon.ico' />
      </Head>

      <AppBar className='px-36 py-4' color='transparent' elevation={0}>
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
    </section>
  )
}
