import * as React from 'react'
import { type BoxProps, Box, Chip, Skeleton, Typography } from '@mui/material'
import { useStorePokemonTypeList } from './pokemon-type-list'
import Image from 'next/image'
import cx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '~/src/libraries/http-request'
import { TResponsePokemonStats } from '../banner/types'
import { PokemonListPagination } from './pokemon-list-pagination'
import { useTranslations } from '~/src/components/hooks/use-translations'

/**
 * =======================================
 * Hooks
 * ========================================
 */

export interface TResponsePokemonList {
  pokemon: Array<{
    pokemon: {
      name: string
      url: string
    }
    slot: number
  }>
}

export function useRequestPokemonList() {
  const { currentPokemonType } = useStorePokemonTypeList()

  return useQuery({
    queryKey: ['pokemonList', currentPokemonType.name],
    queryFn: async () => {
      const pokemonListData = await httpRequest
        .get<TResponsePokemonList>(`/type/${currentPokemonType.name}`)
        .then((res) => ({
          pokemonList: res.data.pokemon,
        }))

      const pokemonList = await Promise.all(
        pokemonListData.pokemonList.map(async (pokemon, index) => {
          const pokemonDetail = await httpRequest
            .get<TResponsePokemonStats>(`/pokemon/${pokemon.pokemon.name}`)
            .then((res) => ({
              imgUrl: res.data.sprites.other['official-artwork'].front_default,
              name: res.data.name,
              types: res.data.types.map((type) => ({
                no: type.slot,
                name: type.type.name,
              })),
            }))

          return {
            no: index + 1,
            imgUrl: pokemonDetail.imgUrl,
            name: pokemonDetail.name,
            types: pokemonDetail.types,
          }
        }),
      )

      return pokemonList
    },
  })
}

/**
 * =======================================
 * Pokemon List Card
 * ========================================
 */

export interface TPokemonListCardProps extends BoxProps {
  pokemonDetail: {
    no: number
    imgUrl: string
    name: string
    types: Array<{ no: number; name: string }>
  }
}

export function PokemonListCard({ pokemonDetail, ...props }: TPokemonListCardProps) {
  const { currentPokemonType } = useStorePokemonTypeList()

  return (
    <Box
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
      p={6}
      borderRadius={4}
      mt={5}
      display='flex'
      justifyContent='space-between'
      {...props}
    >
      <Box flexGrow={1}>
        <Image src={pokemonDetail.imgUrl || ''} alt={currentPokemonType?.name} width={100} height={100} />
      </Box>

      <Box
        paddingX={4}
        flexGrow={1}
        display='flex'
        alignItems='center'
        justifyContent='center'
        borderLeft={'1px solid #F2F2F2'}
      >
        <Typography className='font-bold text-xl'>{`#${pokemonDetail.no.toString().padStart(3, '0')}`}</Typography>
      </Box>

      <Box
        paddingX={4}
        flexGrow={1}
        display='flex'
        alignItems='center'
        justifyContent='center'
        borderLeft={'1px solid #F2F2F2'}
      >
        <Typography className='text-center font-bold text-xl'>{pokemonDetail.name}</Typography>
      </Box>

      <Box
        paddingX={4}
        flexGrow={1}
        display='flex'
        alignItems='center'
        justifyContent='center'
        borderLeft={'1px solid #F2F2F2'}
      >
        {pokemonDetail.types.map((type) => (
          <Chip
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
  )
}

/**
 * =======================================
 * @MainComponent Pokemon  List
 * ========================================
 */

interface TPokemonListProps extends BoxProps {}

export function PokemonList({ ...props }: TPokemonListProps) {
  const t = useTranslations()
  const [pokemonList, setPokemonList] = React.useState<Array<TPokemonListCardProps['pokemonDetail']>>([])
  const { data: pokemonListData, ...pokemonListRes } = useRequestPokemonList()
  const { currentPokemonType } = useStorePokemonTypeList()

  if (pokemonListRes.isPending) {
    return (
      <Box display='flex' flexDirection={'column'} gap={10}>
        <Typography className='text-4xl font-bold'>Pokemon with Type {currentPokemonType?.name}</Typography>

        <Box display='flex' justifyContent='space-between' gap={12}>
          <Skeleton className='flex-1' variant='rectangular' width={100} height={100} />
          <Skeleton className='flex-1' variant='rectangular' width={100} height={100} />
          <Skeleton className='flex-1' variant='rectangular' width={100} height={100} />
        </Box>

        <Box display='flex' justifyContent='space-between' gap={12}>
          <Skeleton className='flex-1' variant='rectangular' width={100} height={100} />
          <Skeleton className='flex-1' variant='rectangular' width={100} height={100} />
          <Skeleton className='flex-1' variant='rectangular' width={100} height={100} />
        </Box>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Typography className='text-4xl font-bold'>
        {t.PokemonType.Title} {currentPokemonType?.name}
      </Typography>

      {pokemonList?.map((pokemonDetail) => <PokemonListCard key={pokemonDetail.name} pokemonDetail={pokemonDetail} />)}

      <PokemonListPagination callbackGetPokemonList={setPokemonList} pokemonList={pokemonListData || []} />
    </Box>
  )
}
