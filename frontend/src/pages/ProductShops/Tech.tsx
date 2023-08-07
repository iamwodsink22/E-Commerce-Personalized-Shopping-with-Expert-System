import React from 'react'
import { Theme } from '@emotion/react'
import { Box, styled,Rating } from '@mui/material'
import FlexBox from 'components/FlexBox'
import {  Small } from 'components/Typography'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {FC,Fragment} from 'react'
import { productList } from '../ProductList'
import { H3 } from 'components/Typography'
import { useNavigate } from 'react-router'




const Tech:FC = () => {
  const navigate=useNavigate()
  return (
    <>
    <H3 sx={{color:'black'}}>Tech Products</H3>
    <Box mb={'8vh'} sx={{backgroundColor:'#cccccc',color:'black'}}>
      
      <Swiper 
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: false }}
      onSwiper={(swiper:any) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      
      >
      

        {productList.map((product, index) => (
            
          <SwiperSlide>
            

            <FlexBox key={index} mt="3vh" ml='3vw' mr='1vw' sx={{cursor:'pointer'}} onClick={()=>navigate('/dashboard/view-product')} >
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
              </SwiperSlide>
      ))}
      
      
        </Swiper>
    </Box>
              </>
  )
}

export default Tech