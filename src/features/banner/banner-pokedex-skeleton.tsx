import * as React from 'react'
import { type Grid2Props, Skeleton, Grid2 as Grid } from '@mui/material'

/**
 * =======================================
 * @MainComponent Banner Pokedex Skeleton
 * ========================================
 */

interface TBannerPokedexSkeletonProps extends Grid2Props {}

export function BannerPokedexSkeleton({ ...props }: TBannerPokedexSkeletonProps) {
  return (
    <Grid container spacing={4} {...props}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={`item-${index}`} display='flex' justifyContent='center' alignItems='center' size={4}>
          <div>
            <Skeleton variant='rectangular' width={275} height={275} />
            <Skeleton width='50%' />
            <Skeleton width='40%' />
          </div>
        </Grid>
      ))}
    </Grid>
  )
}
