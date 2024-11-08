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
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Close } from '@mui/icons-material'

/**
 * =======================================
 * @MainComponent Banner Pokedex
 * ========================================
 */

interface TBannerPokedexProps extends CardProps {}

export function BannerPokedex({ ...props }: TBannerPokedexProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Card onClick={() => setOpen(true)} className='max-w-fit rounded-xl' {...props}>
        <CardActionArea className='p-4'>
          <Image width={275} height={275} alt='Image Banner' src='/images/img-dummy.jpeg' />

          <CardContent>
            <Typography>#001</Typography>
            <Typography className='my-4 font-bold' variant='h5'>
              Pokemon Name
            </Typography>
            <Chip className='bg-chip-orange text-white font-bold' label='Type 01' />
            <Chip className='bg-chip-pink text-white font-bold' label='Type 01' />
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
              <Image src='/images/img-dummy.jpeg' alt='Pokemon Detail' width={400} height={400} />

              <Box>
                <Typography fontWeight={500} variant='h4'>
                  Pokemon Name
                </Typography>

                <Box mt={4} display='flex' justifyContent='space-between'>
                  <Typography>
                    <span className='font-medium'>Weight</span>: 0.5kg
                  </Typography>
                  <Typography>
                    <span className='font-medium'>Height</span>: 0.5kg
                  </Typography>
                </Box>

                <Box mt={4} display='flex' justifyContent='space-between'>
                  <Typography>
                    <span className='font-medium'>Abilities</span>:
                  </Typography>

                  <Box>
                    <Typography>- Abilities 1</Typography>
                    <Typography>- Abilities 2</Typography>
                  </Box>
                </Box>

                <Box mt={4} display='flex' justifyContent='space-between'>
                  <Typography>
                    <span className='font-medium'>Type</span>:
                  </Typography>

                  <Box>
                    <Chip className='bg-chip-orange text-white font-bold' label='Type 01' />
                    <Chip className='bg-chip-pink text-white font-bold' label='Type 01' />
                  </Box>
                </Box>

                <Box mt={4}>
                  <Button variant='contained' className='text-white normal-case font-medium'>
                    More Detail
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
