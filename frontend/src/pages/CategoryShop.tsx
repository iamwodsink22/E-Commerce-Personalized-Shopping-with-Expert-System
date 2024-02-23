import { Box,Card, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { Small } from 'components/Typography'
import {Rating} from '@mui/material'
import { H3 } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { productList } from './ProductList'
import { useSelector } from 'react-redux'
import { selectTechproduct,selectElecproduct, selectHomeproduct } from 'redux/productReducer'
import SearchProduct from './SearchProduct'
import TextSlicer from 'components/TextSlicer'

const CategoryShop = () => {
    const [products,setproducts]=useState([])
    
    const {title}=useParams()
    const navigate=useNavigate()
    const sports=useSelector(selectTechproduct)
    const toys=useSelector(selectElecproduct)
    const Jewellery=useSelector(selectHomeproduct)

useEffect(()=>{
    if(title==='Sports and Outdoor'){
        setproducts(sports)
    }
    else{
      if(title==='Toys and Games'){
      setproducts(toys)
  }
  else{
      setproducts(Jewellery)
  }
}
},[title])
   
const handleView=(id:number)=>{
  navigate(`/dashboard/view-product/${id}`)
}
    console.log(products)
  return (
    <Box>
      <img style={{height:'20vw',width:'100%'}}src={`static/${title}.png`}/>
      <Box display={'flex'} mt='2vw'>

      <H3 style={{fontFamily:'Poppins', marginLeft:'2vw', fontSize:'20px'}}>{title}</H3>
      
      </Box>
        <Box sx={{display:'grid',gridTemplateColumns: 'auto auto auto auto',marginTop:'1vh', ml:'1vw'}}>
        {products.slice(0,15).map((item:any,index:number)=>{
            return(
                <Card style={{height:'60vh', width: '22vw', borderRadius:'7px'}} sx={{display:'inline-grid', justifyContent:'center',margin:'1vw',marginBottom:'1vw',height:'27vh',width:'20vw',cursor:'pointer', ':hover':{transform:'scale(1.05)', transition:'1s' }}} onClick={()=>{handleView(item.product_id); window.scrollTo(0,0)}} >
                     <div style={{objectFit:'cover' , width: '100%',  height: '39vh', alignItems:'center', borderRadius:'7px 7px 0px 0px', }}><img style={{marginTop:'7vh',position:'absolute', marginLeft:'3vw'}} src={item.img_link} alt="Men Keds" width="auto" height='150px'/></div>
                     <hr style={{borderWidth:'0',width:'100%', height:'1px', backgroundColor:'#E3E3E3', marginTop:'-1vh'}}/>

<Box paddingLeft={'1vw'} display="flex"flexDirection='column' ml="0.5rem" mr='1vw' mt='0.5vh' marginTop={'-2vh'}>
  <Small>{item.brand}</Small>
  <TextSlicer text={item.product_name} maxLength={40}/>
  <Rating
    name="read-only"
    size="medium"
    defaultValue={item.ratings}
    readOnly
    sx={{ my: "5px" }}
    style={{marginLeft:'-0.2vw'}}
    />
  <p style={{fontFamily:'Poppins', fontWeight:'600', fontSize:'18px', marginBottom:'-0.5vh', marginTop:'-0.5vh'}}>Rs {Math.ceil(item.discounted_price*120)}</p>
</Box>
                </Card>
            )
        })}
        </Box>
    </Box>
  )
}

export default CategoryShop