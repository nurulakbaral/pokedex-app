import * as React from 'react'
import { type BoxProps, Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslations } from '~/src/components/hooks/use-translations'
import { useRouter } from 'next/router'

/**
 * =======================================
 * @MainComponent Banner
 * ========================================
 */

interface TBannerProps extends BoxProps {}

export function Banner({ className, ...props }: TBannerProps) {
  const router = useRouter()
  const t = useTranslations()

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center' gap={20} mt={12} {...props}>
      <Box>
        <Typography variant='h2' fontWeight='bold'>
          {t.Banner.Title}
        </Typography>

        <Typography className='text-pokedex-grey text-xl my-6' variant='body1'>
          {t.Banner.Subtitle}
        </Typography>

        <Button
          onClick={() => router.push('/pokemon-type')}
          className='text-white normal-case text-base font-bold'
          variant='contained'
          disableElevation
        >
          {t.Banner.Button}
        </Button>
      </Box>

      <Box>
        <Image priority src='/images/img-banner.png' alt='Banner Pokemon' width={534} height={600} />
      </Box>
    </Box>
  )
}
