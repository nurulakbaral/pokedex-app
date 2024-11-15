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
  Footer: {
    WordingGeneration: 'Semua Total Hasil Generasi',
  },
  PokemonDetail: {
    Weight: 'Berat',
    Height: 'Tinggi',
    Abilities: 'Kemampuan',
    Types: 'Tipe',
    ButtonMoreDetails: 'Detail Lengkap',
  },
  SectionNames: {
    OtherImages: 'Gambar Lain',
    Stats: 'Statistik',
    Evolution: 'Evolusi',
  },
  PokemonType: {
    Title: 'Pokemon dengan tipe',
    TypeTitle: 'Tipe Pokémon',
    TypeSubtitle: 'Tipe Pokemon',
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
  Footer: {
    WordingGeneration: 'All Generation Totaling',
  },
  PokemonDetail: {
    Weight: 'Weight',
    Height: 'Height',
    Abilities: 'Abilities',
    Types: 'Types',
    ButtonMoreDetails: 'More Detail',
  },
  SectionNames: {
    OtherImages: 'Other Images',
    Stats: 'Stats',
    Evolution: 'Evolution',
  },
  PokemonType: {
    Title: 'Pokemon with type',
    TypeTitle: 'Pokemon Type',
    TypeSubtitle: 'Pokemon Type',
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
