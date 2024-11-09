import { useRouter } from 'next/router'

export const LangId = {
  NavigationMenu: {
    Home: 'Beranda',
    PokemonType: 'Tipe Pokémon',
  },
  Banner: {
    Title: 'Semua data Pokémon yang Anda perlukan di satu tempat!',
    Subtitle: 'Ribuan data dikumpulkan ke dalam satu tempat',
    Button: 'Kunjungi PokèDex',
  },
}

export const LangEn = {
  NavigationMenu: {
    Home: 'Home',
    PokemonType: 'Pokemon Type',
  },
  Banner: {
    Title: 'All the Pokémon data you’ll ever need in one place!',
    Subtitle: 'Thousands of data compiled into one place',
    Button: 'Check PokèDex',
  },
}

const lang = {
  id: LangId,
  en: LangEn,
}

export function useTranslations() {
  const router = useRouter()
  const langType = router.locale as 'en' | 'id'

  if (!langType) {
    return LangEn
  }

  return lang[langType]
}
