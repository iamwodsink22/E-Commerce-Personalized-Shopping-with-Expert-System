import React,{FC} from 'react'
import Welcome from './Welcome';

import { Box, styled } from '@mui/material';
const ToggleIcon = styled(Box)(({ theme }:any) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: 'black',
}));




const Home:FC = () => {
  
  return (
      <Box top={0} left={0} position={'absolute'} width='100vw' height='100vh' sx={{backgroundColor:'#cccccc'}}>
      <Welcome/>
      </Box>
  )
}

export default Home