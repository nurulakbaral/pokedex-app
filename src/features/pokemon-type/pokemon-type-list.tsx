import { type ListProps, List, ListItem, ListItemButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import cx from 'clsx'
import { create } from 'zustand'
import { useTranslations } from '~/src/components/hooks/use-translations'
import { httpRequest } from '~/src/libraries/http-request'

/**
 * =======================================
 * Hooks
 * ========================================
 */

export const useStorePokemonTypeList = create<{
  currentPokemonType: {
    name: string
    url: string
  }
  setCurrentPokemonType: (name: string, url: string) => void
}>((set) => ({
  currentPokemonType: {
    name: 'normal',
    url: 'https://pokeapi.co/api/v2/type/1/',
  },
  setCurrentPokemonType: (name: string, url: string) => set({ currentPokemonType: { name, url } }),
}))

export interface TResponsePokemonTypeList {
  count: number
  next: string
  previous: null
  results: Array<{
    name: string
    url: string
  }>
}

export function useRequestPokemonTypeList() {
  return useQuery({
    queryKey: ['pokemonTypeList'],
    queryFn: async () =>
      httpRequest.get<TResponsePokemonTypeList>('/type?offset=0&limit=21').then((res) => ({
        pokemonTypeList: res.data.results,
      })),
  })
}

/**
 * =======================================
 * @MainComponent Pokemon Type List
 * ========================================
 */

interface TPokemonTypeListProps extends ListProps {}

export function PokemonTypeList({ ...props }: TPokemonTypeListProps) {
  const { currentPokemonType, setCurrentPokemonType } = useStorePokemonTypeList()
  const t = useTranslations()
  const { data: pokemonTypeListData } = useRequestPokemonTypeList()

  return (
    <List>
      {pokemonTypeListData?.pokemonTypeList.map((pokemonType) => (
        <ListItem key={pokemonType.url}>
          <ListItemButton
            className={cx('min-w-48', currentPokemonType.url === pokemonType.url && 'text-red-700 bg-red-50')}
            onClick={() => setCurrentPokemonType(pokemonType.name, pokemonType.url)}
          >
            {t.PokemonType.TypeSubtitle} <span className='font-bold ml-1'> {pokemonType.name}</span>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
