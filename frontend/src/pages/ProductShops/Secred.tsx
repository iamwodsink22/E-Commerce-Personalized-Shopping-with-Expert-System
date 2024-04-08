import React,{useState} from 'react'
import { Theme } from '@emotion/react'
import { Box,Card, styled,Rating } from '@mui/material'
import FlexBox from 'components/FlexBox'
import {  H4, Small } from 'components/Typography'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useTitle from 'hooks/useTitle'
import {FC,Fragment} from 'react'
import { productList } from '../ProductList'
import { H3 } from 'components/Typography'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import ViewProduct from 'pages/ViewProduct'


export const StyledProductWrapper=styled(Box)(()=>({
  position:'absolute',
  left:'8vw',
  display:'flex',
  width:'max-content',
  
  justifyContent:'center',
  padding:'0.5vw',
  backgroundColor:'#2c2d2d',
  color:'white'
}))
interface RecommendedProps{
  products:any
  title:String
  colour:String
}
const Secred:FC<RecommendedProps> = ({products,title,colour}:any) => {
  console.log("Recommended")
  
  
  const navigate=useNavigate()
  
  const handleView=(id:number)=>{
    navigate(`view-product/${id}`)
  }
  console.log(products)
  return (
    <Box sx={{backgroundColor:'white',marginTop:'8.3vw'}}>
    <H3 sx={{color:'black',ml:'1vw'}}>{title}</H3>
    <Box mb={'8vh'} sx={{color:'white'}}>
    
      
      <Swiper 
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={5}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: false }}
      onSwiper={(swiper:any) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      
      >
      
      <Box sx={{display:'grid',gridTemplateColumns:'auto auto auto auto auto auto auto',marginTop:'1vw', ml:'1vw'}}>
        {products.slice(0,14).map((item:any,index:number)=>(
            
            
                <Card sx={{display:'inline-grid', justifyContent:'center',marginRight:'1vw',marginBottom:'1vw',height:'24vh',width:'10vw',boxShadow:'2px 2px 2px 2px black',backgroundColor:'lightslategrey',borderRadius:'1vh',cursor:'pointer'}}onClick={()=>handleView(item.product_id)}>
                     <span style={{maxWidth:'100px',maxHeight:'100px',marginTop:'10px',marginLeft:'3vh'}}><img src={item?.img_link?item.img_link:'/static/noimage.jpg'} alt="Men Keds" width="100px" height='100px'  /></span>

<Box display="flex"flexDirection='column' ml="0.5rem" mr='2vw' mt='0.5vh'>
  <Small>{item.brand}</Small>
  <Rating
    name="read-only"
    size="small"
    defaultValue={item.ratings}
    readOnly
    sx={{ my: "5px",ml:'2vh' }}
    />
  <H4 fontWeight={600} ml='5vh'>Rs {Math.ceil(item.discounted_price*120)}</H4>
</Box>
          </Card>
              
        ))}
           
        </Box>
       
      
        </Swiper>
    </Box>
    {/* {view.id!==-1&&<ViewProduct product={view}/>} */}
      </Box>
  )
}

export default Secred