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
import useTitle from 'hooks/useTitle'
import React,{FC,Fragment} from 'react'
import SearchProduct from './SearchProduct';
import { productList } from './ProductList'
import { H3 } from 'components/Typography'
import { Recommend } from '@mui/icons-material';
import Popular from './ProductShops/MostPopular';
import Fashion from './ProductShops/Fashion';
import Tech from './ProductShops/Tech';
import Recommended from './ProductShops/Recommended';


export const StyledProductWrapper=styled(Box)(()=>({
  display:'block',
  fontFamily: "'Philosopher', sans-serif",
  justifyContent:'center',
  padding:'0.5vw',
  color:'white'
}))
const Shop:FC = () => {
    useTitle("Browse Products")
  return (
    <StyledProductWrapper>
      
      <Recommended/>
      <Popular/>
      {/* <Fashion/> */}
      <Tech/>
    </StyledProductWrapper>
    )
}

export default Shop
