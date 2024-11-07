import * as React from 'react'
import { type CardProps, Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material'
import Image from 'next/image'

/**
 * =======================================
 * @MainComponent Banner Pokedex
 * ========================================
 */

interface TBannerPokedexProps extends CardProps {}

export function BannerPokedex({ ...props }: TBannerPokedexProps) {
  return (
    <Card className='max-w-fit rounded-xl' {...props}>
      <CardActionArea className='p-4'>
        <Image width={275} height={275} alt='Image Banner' src='/images/img-banner.png' />

        <CardContent>
          <Typography>#001</Typography>
          <Typography className='my-4 font-bold' variant='h5'>
            Pokemon Name
          </Typography>
          <Chip className='bg-green-300' label='Type 01' />
          <Chip className='bg-red-300' label='Type 02' />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
