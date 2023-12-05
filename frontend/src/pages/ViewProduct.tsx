import { Box, Card, Typography, styled,Rating, Button } from '@mui/material'
import { H1, H3, H4,Small } from 'components/Typography'
import React,{FC, Fragment,useEffect,useState} from 'react'
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
import { useNavigate, useParams } from 'react-router';
import { TypeSpecimenOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CART, Add2Cart } from 'redux/cartReducer';
import axios from 'axios';
import { getProduct, getRecProduct, selectRecproduct, selectElecproduct, selectProduct } from 'redux/productReducer';

const ViewProductWrapper=styled(Box)(()=>({
    display:'flex',
    marginTop:'2vh',
    justifyContent:'center',
    textAlign:'center',
    width:'85vw',
    marginLeft:'auto',
    marginRight:'auto'
}))

const ViewProduct:FC = () => {
  // const [product,setproduct]=useState(Object)
  // const[rec,setrec]=useState(Array)
  // const[pid,setpid]=useState(String)
  
  const dispatch=useDispatch<any>()
  const product=useSelector(selectProduct)
  const rec=useSelector(selectRecproduct)
  
  const {id}:any=useParams()
  
  
  const navigate=useNavigate()

useEffect(()=>{
 dispatch(getProduct(id))
 dispatch(getRecProduct(id))
},[dispatch,id])
    useTitle("View Product")
    const handleCart=()=>{
    dispatch(Add2Cart(product))
    }
  
    const handleView=(id:number)=>{
      navigate(`/dashboard/view-product/${id}`)
    } 
  const rec_index=Math.floor(Math.random()*(rec.length-5))
  console.log(rec)
  const new_rec=rec.slice(rec_index,rec_index+5)
  console.log(new_rec)
  return (
    <>
    <ViewProductWrapper>
    <Box mr='2vw' marginTop={'auto'} marginBottom={'auto'}>
        <img style={{width:'16vw',height:'30vh'}} src={product.img_link} placeholder='imgs' alt='imgs'/>
    </Box>
    <Card sx={{display:'block',padding:'2vh',maxHeight:'105vh',marginRight:'5vw', borderRadius:'3vh',maxWidth:'45vw'}}>
        <H1 color={(theme)=>theme.palette.primary.main}>{product.product_name}</H1>
        <Box textAlign={'left'} mt='1vw'>

        <Typography color={(theme)=>theme.palette.primary.main}>Company : {product.brand}</Typography>
        <Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>Actual Price: ${product.actual_price}</Typography>
        <Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>Discounted Price: ${product.discounted_price}</Typography>
        </Box>
        <Box display={'flex'} mt={'1vw'}>
            <Typography color={(theme)=>theme.palette.primary.main}>Rating</Typography>
        <Rating
              name="read-only"
              size="small"
              defaultValue={4.5}
              readOnly
              sx={{ my: "3px" }}
              />
              <Typography ml='1vw'>{product.rating}</Typography>
        </Box>
        <Typography mt={'2vw'} color={(theme)=>theme.palette.primary.main}>Description:</Typography>
        <Typography>{product.about_product}</Typography>
        <Box mt={'5vh'} p='0.5vw' sx={{color:'white'}}>

        <Button sx={{backgroundColor:'black',mr:'1vw',cursor:'pointer'}} onClick={handleCart}><AddShoppingCartIcon fontSize='small' sx={{float:'left'}}/> Add to Cart</Button>
        <Button sx={{backgroundColor:'skyblue',cursor:'pointer'}}><CreditCardIcon fontSize='small'/> Order Now</Button>
        </Box>

    </Card>
    <Card sx={{ padding: "1rem", height: "100%",width:'50vw',borderRadius:'3vh' }}>
        <H3>Our Recommendations</H3>
       
      

        {new_rec.map((produc:any, index:number) => (
            
          
          
          
          <FlexBox key={index} mt="5vh" onClick={()=>handleView(produc.product_id)} sx={{cursor:'pointer'}} >
          <span style={{maxWidth:'85px',maxHeight:'40px'}}><img src={produc.img_link} alt="Men Keds"  width="80px" height='60px' /></span>

          <Box display="flex" flexDirection={'column'} ml="1rem" mr='1vw'>
            <Small>{produc.brand}</Small>
            <Rating
              name="read-only"
              size="small"
              defaultValue={produc.rating}
              readOnly
              sx={{ my: "3px" }}
              />
            <Small fontWeight={600}>${produc.discounted_price}</Small>
          </Box>
        </FlexBox>
             
      )
      )}
       
      
        
    </Card>
    
    </ViewProductWrapper>
       <Box marginLeft='10vw' mt='5vh'>
        <H3>More from Apple</H3>
    <Card sx={{ height: "30%",width:'60vw',borderRadius:'3vh',display:'flex' }}>
       
      

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
             </Box>

      </>
  )
}

export default ViewProduct