import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CardBox } from '../components'
import { PlusIcon } from '../icons'

export const Home = () => {

  return (
    <Box sx={{ padding: 4, paddingTop: 5, width: '100%' }} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >
        <Typography variant='h4' color={'royalblue'} >User Management</Typography>
        <Button sx={{ border: '1px solid royalblue', borderRadius: 6, fontWeight: 'bold', padding: "12px 20px 12px 20px" }} >
          ADD USER
          <PlusIcon />
        </Button>
      </Box>
      <Box sx={{ padding: 3, display: 'flex', flexWrap: 'wrap', gap: 4}} >
        <CardBox width={400} height={150} />
        <CardBox width={400} height={150} />
        <CardBox width={400} height={150} />
        <CardBox width={400} height={150} />
        <CardBox width={400} height={150} />
      </Box>
    </Box>
  )
}