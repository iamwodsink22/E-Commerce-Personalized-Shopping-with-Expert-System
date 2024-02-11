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
      <img style={{height:'15vw',width:'100%'}}src={'https://i.pinimg.com/originals/9a/71/6f/9a716f90fc2e24079b8960168d5ea089.jpg'}/>
      <Box display={'flex'} mt='2vw'>

      <H3>{title}</H3>
      <SearchProduct/>
      </Box>
        <Box sx={{display:'grid',gridTemplateColumns: 'auto auto auto auto',marginTop:'1vw', ml:'1vw'}}>
        {products.slice(0,15).map((item:any,index:number)=>{
            return(
                <Card sx={{display:'inline-grid', justifyContent:'center',marginRight:'1vw',marginBottom:'1vw',height:'27vh',width:'20vw',cursor:'pointer'}} onClick={()=>handleView(item.product_id)} >
                     <span style={{maxWidth:'100px',maxHeight:'150px'}}><img src={item.img_link} alt="Men Keds" width="100px" height='150px' /></span>

<Box display="flex"flexDirection='column' ml="0.5rem" mr='2vw' mt='0.5vh'>
  <Small>{item.brand}</Small>
  <Rating
    name="read-only"
    size="small"
    defaultValue={item.ratings}
    readOnly
    sx={{ my: "5px" }}
    />
  <Small fontWeight={600}>Rs {Math.ceil(item.discounted_price*120)}</Small>
</Box>
                </Card>
            )
        })}
        </Box>
    </Box>
  )
}

export default CategoryShop