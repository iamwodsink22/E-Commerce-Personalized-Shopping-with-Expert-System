import { Theme } from '@emotion/react'
import { Box, styled,Rating } from '@mui/material'
import FlexBox from 'components/FlexBox'
import {  Small } from 'components/Typography'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import CatBox from './CatBox';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useTitle from 'hooks/useTitle'
import React,{FC,Fragment,useEffect,useState} from 'react'
import SearchProduct from './SearchProduct';
import { productList } from './ProductList'
import { H3 } from 'components/Typography'
import { Recommend } from '@mui/icons-material';
import Popular from './ProductShops/MostPopular';
import Fashion from './ProductShops/Fashion';
import Tech from './ProductShops/Tech';
import Recommended from './ProductShops/Recommended';
import axios from 'utils/axios';
import CategoryWrapper from './CategoryWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getElecProduct, getHomeProduct, getTechProduct, selectElecproduct, selectHomeproduct, selectTechproduct,selectPProduct,getPRecProduct } from 'redux/productReducer';
import Secred from './ProductShops/Secred';


export const StyledProductWrapper=styled(Box)(()=>({
  display:'block',
  fontFamily: "'Philosopher', sans-serif",
  justifyContent:'center',
  padding:'0.5vw',
  backgroundImage:"url('/static/bgh.jpg')",
  color:'white',
  height:'30vh'
}))
const Shop:FC = () => {
  console.log("shop")
  const dispatch=useDispatch<any>()
  useTitle("Browse Products")
  
useEffect(()=>{
dispatch(getHomeProduct())
dispatch(getTechProduct())
dispatch(getElecProduct())
dispatch(getPRecProduct(1))

},[])
// const elecproducts:any=useSelector<any>(selectElecproduct)
// const techproducts:any=useSelector<any>(selectTechproduct)
// const homeproducts:any=useSelector<any>(selectHomeproduct)
const personalizedProducts:any=useSelector<any>(selectPProduct)

    

 

  
  
  
  
  return (
    <>
      {/* <SearchProduct/> */}
    <StyledProductWrapper>
      <div style={{display:'flex',marginTop:'25vh', marginBottom:'10vh'}}>

      
     
      </div>
      <Box marginTop={'10vh'}><CatBox  title={"Sports and Outdoor"}/>
      <CatBox title={"Toys and Games"}/>
      <CatBox title={"Clothing, Shoes and Jewellery"}/></Box>
      
      <Secred products={personalizedProducts}
       title={'Personalized Recommendations for you'} colour={'#cccccc'}/>
    </StyledProductWrapper>
    </>
    )
}

export default Shop
