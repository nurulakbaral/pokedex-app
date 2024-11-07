import * as React from 'react'
import { Button } from '@mui/material'
import Head from 'next/head'

export default function Home() {
  return (
    <section>
      <Head>
        <title>Home</title>
        <link rel='shortcut icon' href='https://assets.pokemon.com/static2/_ui/img/favicon.ico' />
      </Head>

      <Button variant='contained'>Hello World</Button>
    </section>
  )
}
