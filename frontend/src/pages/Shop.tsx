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
import React,{FC,Fragment,useState} from 'react'
import SearchProduct from './SearchProduct';
import { productList } from './ProductList'
import { H3 } from 'components/Typography'
import { Recommend } from '@mui/icons-material';
import Popular from './ProductShops/MostPopular';
import Fashion from './ProductShops/Fashion';
import Tech from './ProductShops/Tech';
import Recommended from './ProductShops/Recommended';
import axios from 'utils/axios';


export const StyledProductWrapper=styled(Box)(()=>({
  display:'block',
  fontFamily: "'Philosopher', sans-serif",
  justifyContent:'center',
  padding:'0.5vw',
  // backgroundImage:"url('/static/back.jfif')",
  color:'white',
  height:'88vh'
}))
const Shop:FC = () => {
  const [comp,setcomp]=useState([])
  const [elect,setelect]=useState([])
  const [home,sethome]=useState([])

    useTitle("Browse Products")
    async function getProducts(){
    const compute=await axios.get('/products/getcategory',{params:{category:"Computers&Accessories'"}})
    const computer=compute.data
    setcomp(computer)
    const electron=await axios.get('/products/getcategory',{params:{category:"Electronics'"}})
    const electronics=electron.data
    setelect(electronics)
    const homes=await axios.get('/products/getcategory',{params:{category:"Home&Kitchen'"}})
    const kitchen=homes.data
    sethome(kitchen)
  
    
    
    }
  getProducts()
  return (
    <StyledProductWrapper>
      <SearchProduct/>
      <Recommended products={comp} title={'Computers and Accesories'} colour={'#2c2d2d'}/>
      <Recommended products={home} title={'Home and Kitchen'} colour={'#cccccc'}/>
      <Recommended products={elect} title={'Electronics and enterntaintment'} colour={'#ff4040'}/>
      {/* <Fashion/> */}
      {/* <Tech/> */}
    </StyledProductWrapper>
    )
}

export default Shop
