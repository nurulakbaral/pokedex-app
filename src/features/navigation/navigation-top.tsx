import { type AppBarProps, AppBar, Button, Toolbar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '~/src/components/hooks/use-translations'
import { I18nMenu } from '~/src/features/i18n'

/**
 * =======================================
 * @MainComponent Banner Pokedex
 * ========================================
 */

interface TNavigationTopProps extends AppBarProps {}

export function NavigationTop({ ...props }: TNavigationTopProps) {
  const t = useTranslations()

  return (
    <AppBar position='relative' className='py-4' color='transparent' elevation={0} {...props}>
      <Toolbar className='gap-9'>
        <Image priority width={170} height={60} alt='Pokemon Logo' src='/logos/pokemon-logo.png' />

        <Link href='/'>
          <Button className='normal-case font-medium' size='large' disableRipple>
            {t.NavigationMenu.Home}
          </Button>
        </Link>

        <Link href='/pokemon-type'>
          <Button className='normal-case font-medium' size='large' disableRipple>
            {t.NavigationMenu.PokemonType}
          </Button>
        </Link>

        <I18nMenu flexGrow={1} />
      </Toolbar>
    </AppBar>
  )
}
