import * as React from 'react'
import { type BoxProps, Box, Chip, Skeleton, Typography, IconButton } from '@mui/material'
import Image from 'next/image'
import cx from 'clsx'
import { useTranslations } from '~/src/components/hooks/use-translations'
import { NavigationTop } from '~/src/features/navigation/navigation-top'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '~/src/libraries/http-request'
import { TResponsePokemonStats } from '~/src/features/banner/types'
import { requestEvolutionPokemonChain } from '~/src/services/get-pokemon-evolution'
import { ArrowForward } from '@mui/icons-material'
import { useStorePokemonTypeList } from '~/src/features/pokemon-type/pokemon-type-list'

/**
 * =======================================
 * Section Pokemon Evolution
 * ========================================
 */

interface TSectionPokemonEvolutionProps extends BoxProps {
  sectionPokemonEvolution: null | Array<{ name: string; url: string }>
}

export function SectionPokemonEvolution({ sectionPokemonEvolution, ...props }: TSectionPokemonEvolutionProps) {
  const router = useRouter()
  const t = useTranslations()

  return (
    <Box mt={6} {...props}>
      <Typography className='font-bold text-xl'>{t.SectionNames.Evolution}:</Typography>

      <Box
        maxWidth={'100%'}
        overflow='auto'
        display='flex'
        flexWrap='nowrap'
        gap={4}
        mt={4}
        p={4}
        sx={{
          overscrollBehaviorX: 'contain',
        }}
      >
        {sectionPokemonEvolution?.map((evolution, index) => (
          <Box
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => router.push(`/${evolution.name}`)}
            key={evolution.name + index}
            display='flex'
          >
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Box
                flexShrink={0}
                display='flex'
                flexDirection={'column'}
                alignItems='center'
                justifyContent='center'
                sx={{
                  borderRadius: 100,
                  width: 200,
                  height: 200,
                  border: `16px solid ${cx(
                    index === 0 && '#0571A6',
                    index === 1 && '#E66D00',
                    index === 2 && '#E6AB09',
                    index === 3 && '#01B956',
                    index === 4 && '#3C48CF',
                    index === 5 && '#DE2C2C',
                    index >= 6 && '#E6AB09',
                  )}`,
                  padding: 4,
                }}
              >
                <Image width={200} height={200} src={evolution.url.toString() || ''} alt={evolution.name} />
              </Box>

              <Typography className='font-bold text-xl mt-4'>{evolution.name}</Typography>
            </Box>

            {index !== sectionPokemonEvolution.length - 1 && (
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <ArrowForward className='text-[100px] ml-4' />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * =======================================
 * Section Pokemon Stats
 * ========================================
 */

interface TSectionPokemonStatsProps extends BoxProps {
  sectionPokemonStats: null | Array<{ name: string; value: number }>
}

export function SectionPokemonStats({ sectionPokemonStats, ...props }: TSectionPokemonStatsProps) {
  const t = useTranslations()

  return (
    <Box mt={6} {...props}>
      <Typography className='font-bold text-xl'>{t.SectionNames.Stats}:</Typography>

      <Box
        maxWidth={'100%'}
        overflow='auto'
        display='flex'
        flexWrap='nowrap'
        gap={4}
        mt={4}
        p={4}
        sx={{
          overscrollBehaviorX: 'contain',
        }}
      >
        {sectionPokemonStats?.map((stat, index) => (
          <Box
            flexShrink={0}
            display='flex'
            flexDirection={'column'}
            alignItems='center'
            justifyContent='center'
            sx={{
              borderRadius: 100,
              width: 200,
              height: 200,
              border: `32px solid ${cx(
                index === 0 && '#0571A6',
                index === 1 && '#E66D00',
                index === 2 && '#E6AB09',
                index === 3 && '#01B956',
                index === 4 && '#3C48CF',
                index === 5 && '#DE2C2C',
                index >= 6 && '#E6AB09',
              )}`,
              padding: 4,
            }}
            key={stat.name + index}
          >
            <Typography
              variant='h2'
              className={cx(
                'font-medium',
                index === 0 && 'text-[#0571A6]',
                index === 1 && 'text-[#E66D00]',
                index === 2 && 'text-[#E6AB09]',
                index === 3 && 'text-[#01B956]',
                index === 4 && 'text-[#3C48CF]',
                index === 5 && 'text-[#DE2C2C]',
                index >= 6 && 'text-[#E6AB09]',
              )}
            >
              {stat.value}
            </Typography>
            <Typography className='font-medium'>{stat.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * =======================================
 * Section Pokemon Images
 * ========================================
 */

interface TSectionPokemonImagesProps extends BoxProps {
  sectionPokemonImages: null | Array<string>
}

export function SectionPokemonImages({ sectionPokemonImages, ...props }: TSectionPokemonImagesProps) {
  const t = useTranslations()

  return (
    <Box>
      <Typography className='font-bold text-xl'>{t.SectionNames.OtherImages}:</Typography>

      <Box
        sx={{
          overscrollBehaviorX: 'contain',
        }}
        maxWidth={'100%'}
        overflow='auto'
        display='flex'
        flexWrap='nowrap'
        gap={16}
        mt={4}
        p={4}
      >
        {sectionPokemonImages?.map((image, index) => (
          <Box key={image + index}>{image && <Image alt='Pokemon' src={image} width={120} height={120} />}</Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * =======================================
 * Section Pokemon Detail
 * ========================================
 */

interface TSectionPokemonDetailProps extends BoxProps {
  sectionPokemonDetail: null | {
    imageUrl: string
    name: string
    height: string | number
    weight: string | number
    abilities: Array<{ name: string }>
    types: Array<{ no: number; name: string }>
  }
}

export function SectionPokemonDetail({ sectionPokemonDetail, ...props }: TSectionPokemonDetailProps) {
  const router = useRouter()
  const { setCurrentPokemonType } = useStorePokemonTypeList()
  const t = useTranslations()

  return (
    <Box display='flex' gap={10} {...props}>
      <Box>
        <Image alt='Pokemon' src={sectionPokemonDetail?.imageUrl || ''} width={400} height={400} />
      </Box>

      <Box>
        <Box>
          <Typography variant='h2'>{sectionPokemonDetail?.name}</Typography>
        </Box>

        <Box mt={4} display='flex' justifyContent='space-between' gap={4}>
          <Typography>
            <span className='font-medium'>{t.PokemonDetail.Weight}</span>: {sectionPokemonDetail?.weight}
          </Typography>

          <Typography>
            <span className='font-medium'>{t.PokemonDetail.Height}</span>: {sectionPokemonDetail?.height}
          </Typography>
        </Box>

        <Box mt={4} display='flex' justifyContent='space-between' gap={4}>
          <Typography>
            <span className='font-medium'>{t.PokemonDetail.Abilities}</span>:
          </Typography>

          <Box>
            {sectionPokemonDetail?.abilities.map((ability) => (
              <Typography key={ability.name}>{ability.name}</Typography>
            ))}
          </Box>
        </Box>

        <Box mt={4} display='flex' justifyContent='space-between'>
          <Typography>
            <span className='font-medium'>{t.PokemonDetail.Types}</span>:
          </Typography>

          <Box>
            {sectionPokemonDetail?.types.map((type) => (
              <Chip
                onClick={() => {
                  router.push(`/pokemon-type`)
                  setCurrentPokemonType(type.name, '')
                }}
                key={type.name}
                className={cx(
                  'text-white font-bold mr-2',
                  type.no === 1 && 'bg-chip-orange',
                  type.no === 2 && 'bg-chip-red',
                  type.no === 3 && 'bg-chip-green',
                  type.no === 4 && 'bg-chip-pink',
                  type.no === 5 && 'bg-chip-blue',
                  type.no === 6 && 'bg-chip-yellow',
                )}
                label={type.name}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * =======================================
 * @Layout Page
 * ========================================
 */

export default function PokemonDetailPage() {
  const router = useRouter()
  const pokemonName = router.query.name
  const { data: pokemonDetailData, ...pokemonDetailRes } = useQuery({
    queryKey: ['pokemonDetail', pokemonName],
    queryFn: async () => {
      const res = await httpRequest.get<TResponsePokemonStats>(`/pokemon/${pokemonName}`)
      const sectionPokemonEvolution = await requestEvolutionPokemonChain(res.data.species.url)

      return {
        sectionPokemonDetail: {
          imageUrl: res.data.sprites.other['official-artwork'].front_default,
          name: res.data.name,
          height: res.data.height,
          weight: res.data.weight,
          abilities: res.data.abilities.map((ability) => ({
            name: '•' + ' ' + ability.ability.name,
          })),
          types: res.data.types.map((type) => ({
            no: type.slot,
            name: type.type.name,
          })),
        },
        sectionPokemonSprites: [
          res.data.sprites.back_default,
          res.data.sprites.back_female,
          res.data.sprites.back_shiny,
          res.data.sprites.back_shiny_female,
          res.data.sprites.front_default,
          res.data.sprites.front_female,
          res.data.sprites.front_shiny,
          res.data.sprites.front_shiny_female,
        ] as Array<string>,
        sectionPokemonStats: res.data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        sectionPokemonEvolution,
      }
    },
  })

  if (pokemonDetailRes.isPending) {
    return (
      <Box paddingX={16}>
        <NavigationTop />

        <Box mt={10} display='flex' gap={4}>
          <Skeleton variant='rectangular' width={400} height={400} />

          <Box width={600} display='flex' flexDirection='column'>
            <Skeleton height={60} width='100%' />
            <Skeleton height={50} width='90%' />
            <Skeleton height={60} width='100%' />
            <Skeleton height={50} width='90%' />
            <Skeleton height={60} width='100%' />
            <Skeleton height={50} width='90%' />
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box paddingX={16} pb={20}>
      <NavigationTop />

      <Box mt={8}>
        <SectionPokemonDetail sectionPokemonDetail={pokemonDetailData?.sectionPokemonDetail || null} />

        <SectionPokemonImages sectionPokemonImages={pokemonDetailData?.sectionPokemonSprites || []} />

        <SectionPokemonStats sectionPokemonStats={pokemonDetailData?.sectionPokemonStats || []} />

        <SectionPokemonEvolution sectionPokemonEvolution={pokemonDetailData?.sectionPokemonEvolution || []} />
      </Box>
    </Box>
  )
}
