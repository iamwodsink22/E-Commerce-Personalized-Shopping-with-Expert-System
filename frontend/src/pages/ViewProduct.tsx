import { Box, Card, Typography, styled,Rating, Button } from '@mui/material'
import { H1, H3, H4,Small } from 'components/Typography'
import React,{FC, Fragment} from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FlexBox from 'components/FlexBox';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useTitle from 'hooks/useTitle'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { productList } from './ProductList'

const ViewProductWrapper=styled(Box)(()=>({
    display:'flex',
    marginTop:'5vh',
    justifyContent:'center',
    textAlign:'center',
    width:'75vw',
    marginLeft:'auto',
    marginRight:'auto'
}))

const ViewProduct:FC = () => {
    useTitle("View Product")
  return (
    <ViewProductWrapper>
    <Box mr='4vw' marginTop={'auto'} marginBottom={'auto'}>
        <img style={{width:'16vw'}} src='/static/products/camera.png' placeholder='imgs' alt='imgs'/>
    </Box>
    <Card sx={{display:'block',padding:'2vh',height:'60vh',marginRight:'5vw', borderRadius:'3vh'}}>
        <H1 color={(theme)=>theme.palette.primary.main}>Apple Light</H1>
        <Box textAlign={'left'} mt='1vw'>

        <Typography color={(theme)=>theme.palette.primary.main}>Company : Apple</Typography>
        <Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>Price: $900</Typography>
        </Box>
        <Box display={'flex'} mt={'1vw'}>
            <Typography color={(theme)=>theme.palette.primary.main}>Rating:</Typography>
        <Rating
              name="read-only"
              size="small"
              defaultValue={4.5}
              readOnly
              sx={{ my: "3px" }}
              />
              <Typography ml='1vw'>4.5/5</Typography>
        </Box>
        <Typography mt={'2vw'} color={(theme)=>theme.palette.primary.main}>Description:</Typography>
        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ea placeat, maiores doloremque, quis nulla porro iure provident consequatur ullam impedit! Odit, magnam? Porro perferendis, vitae a corrupti magnam nisi?</Typography>
        <Box mt={'10vh'} p='0.5vw' sx={{color:'white'}}>

        <Button sx={{backgroundColor:'black',mr:'1vw'}}><AddShoppingCartIcon fontSize='small' sx={{float:'left'}}/> Add to Cart</Button>
        <Button sx={{backgroundColor:'skyblue'}}><CreditCardIcon fontSize='small'/> Order Now</Button>
        </Box>

    </Card>
    <Card sx={{ padding: "2rem", height: "100%",width:'37vw',borderRadius:'3vh' }}>
        <H3>Similar Products</H3>
       
      

        {productList.slice(0,4).map((product, index) => (
            
           
            
             
        <FlexBox key={index} mt="5vh" >
          <img src={product.image} alt="Men Keds" width="90px" />

          <Box display="flex" flexDirection={'column'} ml="1rem" mr='2vw'>
            <Small>{product.title}</Small>
            <Rating
              name="read-only"
              size="small"
              defaultValue={product.rating}
              readOnly
              sx={{ my: "3px" }}
              />
            <Small fontWeight={600}>${product.price}</Small>
          </Box>
        </FlexBox>
             
      )
      )}
       
      
        
    </Card>
    
    </ViewProductWrapper>
  )
}

export default ViewProduct