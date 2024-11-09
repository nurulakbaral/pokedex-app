import * as React from 'react'
import {
  type CardProps,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Close } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '~/src/libraries/http-request'
import cx from 'clsx'
import { TResponsePokemonStats } from './types'
import { useTranslations } from '~/src/components/hooks/use-translations'

/**
 * =======================================
 * @MainComponent Banner Pokedex
 * ========================================
 */

interface TBannerPokedexProps extends CardProps {
  index: number
  pokemonDetail: {
    name: string
    url: string
  }
}

export function BannerPokedex({ index, pokemonDetail, ...props }: TBannerPokedexProps) {
  const t = useTranslations()
  const [open, setOpen] = React.useState(false)
  const { data: pokemonDetailData, ...pokemonDetailRes } = useQuery({
    queryKey: ['pokemonDetail', pokemonDetail.url],
    queryFn: async () =>
      httpRequest.get<TResponsePokemonStats>(pokemonDetail.url).then((res) => ({
        imageUrl: res.data.sprites.other['official-artwork'].front_default,
        types: res.data.types.map((type) => ({
          no: type.slot,
          name: type.type.name,
        })),
        height: res.data.height,
        weight: res.data.weight,
        abilities: res.data.abilities.map((ability) => ({
          name: '•' + ' ' + ability.ability.name,
        })),
      })),
    enabled: !!pokemonDetail.url,
  })

  if (pokemonDetailRes.isPending) {
    return (
      <div>
        <Skeleton variant='rectangular' width={275} height={275} />
        <Skeleton width='50%' />
        <Skeleton width='40%' />
      </div>
    )
  }

  return (
    <div>
      <Card onClick={() => setOpen(true)} className='max-w-fit rounded-xl' {...props}>
        <CardActionArea className='p-4'>
          <Image width={275} height={275} alt='Image Banner' src={pokemonDetailData?.imageUrl || ''} />

          <CardContent>
            <Typography>{`#${index.toString().padStart(4, '0')}`}</Typography>
            <Typography className='my-4 font-bold' variant='h5'>
              {pokemonDetail.name}
            </Typography>

            {pokemonDetailData?.types.map((type) => (
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
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog maxWidth={false} onClose={() => setOpen(false)} open={open}>
        <Box
          sx={{
            paddingX: 2,
          }}
        >
          <Box p={2} display='flex' justifyContent='flex-end'>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <DialogContent>
            <Box gap={4} display='flex'>
              <Image src={pokemonDetailData?.imageUrl || ''} alt='Pokemon Detail' width={400} height={400} />

              <Box>
                <Typography fontWeight={500} variant='h4'>
                  {pokemonDetail.name}
                </Typography>

                <Box mt={4} display='flex' justifyContent='space-between' gap={4}>
                  <Typography>
                    <span className='font-medium'>{t.PokemonDetail.Weight}</span>: {pokemonDetailData?.weight}
                  </Typography>

                  <Typography>
                    <span className='font-medium'>{t.PokemonDetail.Height}</span>: {pokemonDetailData?.height}
                  </Typography>
                </Box>

                <Box mt={4} display='flex' justifyContent='space-between' gap={4}>
                  <Typography>
                    <span className='font-medium'>{t.PokemonDetail.Abilities}</span>:
                  </Typography>

                  <Box>
                    {pokemonDetailData?.abilities.map((ability) => (
                      <Typography key={ability.name}>{ability.name}</Typography>
                    ))}
                  </Box>
                </Box>

                <Box mt={4} display='flex' justifyContent='space-between'>
                  <Typography>
                    <span className='font-medium'>{t.PokemonDetail.Types}</span>:
                  </Typography>

                  <Box>
                    {pokemonDetailData?.types.map((type) => (
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

                <Box mt={4}>
                  <Button variant='contained' className='text-white normal-case font-medium'>
                    {t.PokemonDetail.ButtonMoreDetails}
                  </Button>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  )
}
