import * as React from 'react'
import { type BoxProps, Box, Button, Typography } from '@mui/material'
import Image from 'next/image'

/**
 * =======================================
 * @MainComponent Banner
 * ========================================
 */

interface TBannerProps extends BoxProps {}

export function Banner({ className, ...props }: TBannerProps) {
  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center' gap={20} mt={12} {...props}>
      <Box>
        <Typography variant='h2' fontWeight='bold'>{`All the Pokémon data you'll ever need in one place!`}</Typography>

        <Typography className='text-pokedex-grey text-xl my-6' variant='body1'>
          Thousands of data compiled into one place
        </Typography>

        <Button className='text-white normal-case text-base font-bold' variant='contained' disableElevation>
          Check PokèDex
        </Button>
      </Box>

      <Box>
        <Image src='/images/img-banner.png' alt='Banner Pokemon' width={534} height={600} />
      </Box>
    </Box>
  )
}
