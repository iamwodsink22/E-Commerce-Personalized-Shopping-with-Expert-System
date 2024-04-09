import React,{FC, useState } from 'react'
import { Add, Remove } from "@mui/icons-material";
import { Span } from 'components/Typography'
import { Card } from '@mui/material';
import { Product,ProductDetail,ProductAmount,Details,PriceDetail,ProductPrice,ProductColor,ProductAmountContainer } from 'pages/Cart';
import {Rating} from '@mui/material'
import axios from 'utils/axios';
import toast from 'react-hot-toast';
import useAuth from 'hooks/useAuth';

interface HistoryProps{
    product:any,
    rating:number
}
const HistoryDetails:FC<HistoryProps> = ({product,rating}) => {
  const {user}=useAuth()
  const handleChange=async(n:any)=>{
    const res=await axios.put(`/transaction/rate/${user?.usr_id}`,{product_id:product.product_id,rating:n} )
    if(res.status==200){
    
    toast.success("Product rated successfully")
    }
    
  }
  
  return (
    <Card sx={{pl:'2vw',mb:'1vh', width:'64vw'}}>
    <Product>
              <ProductDetail>
                <div style={{width:'150px', backgroundColor:'white', justifyContent:'center', borderRight:'1px solid #E3E3E3', margin:'1vh 0vh 1vh 0vh'}}>
                  <img style={{width:'auto',height:'130px', marginTop:'2vh', position:'relative'}} src={product.img_link} alt="hello" />
                  </div>
                  
                
                <Details paddingRight={'20vw'} width={'35vw'} paddingLeft={'1vw'} style={{ margin:'1vh 0vw 1vh 0vw', borderRight:'solid 1px #E5E5E5'}}>
                  <Span style={{marginLeft:'1vw', fontFamily:'Poppins', fontWeight:'500', fontSize:'20px' }}>
                    {/* <b>Product:</b>  */}
                    {product.product_name}
                  </Span>
                  <ProductAmount style={{marginLeft:'1vw', fontFamily:'Poppins', fontSize:'20px', color:'grey'}}>${product.discounted_price}</ProductAmount>
                  <p style={{marginLeft:'1vw', fontFamily:'Poppins'}}>QTY <span style={{marginLeft:'1vw'}}>{1}</span></p>
                  <Rating
    name="simple-controlled"
    size="medium"
    defaultValue={rating}
    value={rating}
    onChange={(e,n)=>handleChange(n)}
    sx={{ my: "5px" }}
    style={{marginLeft:'1vw'}}
    />




                  {/* <Span>
                    <b>ID:</b> {product.product_id}
                  </Span> */}
                  {/* <ProductColor color={product.color} /> */}
                  {/* <Span>
                    <b>Size:</b> {product.size}
                  </Span> */}
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer >
                    <div style={{width:'100%', paddingLeft:'4vw', fontFamily:'Poppins', fontWeight:'bold', color:'#6E6E6E', fontSize:'12px', marginRight:'-6.5vw'}}>
                    <p style={{ marginRight:'10vw',marginTop:'-12vh'}}>Order Number: <span style={{fontFamily:'Roboto', fontWeight:'normal'}}>{Math.floor(Math.random()*100000)}</span></p>
                    <p style={{ marginRight:'10vw', marginTop:'-2vh'}}>Order Placed: <span style={{fontFamily:'Roboto', fontWeight:'normal'}}>2024/02/21 21:32</span></p>
                    </div>
                    
                  {/* <Add />
                  <button>{product[product.id]}</button>
                  <Remove /> */}

                  
                  {/* <ProductPrice style={{marginLeft:'3vw', fontFamily:'Poppins', color:'black', fontWeight:'550'}}>${product.discounted_price*product[product.id]}</ProductPrice> */}
                  {/* <img style={{marginLeft:'3vw'}} width={'45vw'} src='https://cdn.iconscout.com/icon/free/png-256/free-remove-320-451046.png' alt="" /> */}
                  
                </ProductAmountContainer>
                
                
              </PriceDetail>
            </Product>
            </Card>
            
  )
}

export default HistoryDetails
