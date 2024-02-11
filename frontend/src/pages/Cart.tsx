
import { Add, Remove } from "@mui/icons-material";
import {styled, Box, Button, cardActionAreaClasses} from '@mui/material'

import { H1, Span } from "components/Typography";
import { FC, useEffect } from "react";
import ProductDetails from "./ProductShops/ProductDetails";
import { useNavigate } from "react-router";
import useTitle from "hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "hooks/useAuth";
import { getCart, selectCart } from "redux/cartReducer";
import axios from 'axios';
import { AppDispatch } from "redux/Store";



const Wrapper = styled(Box)(({theme}:any)=>({
    padding: '20px'
}))
 
 

const Title = styled(H1)(({theme}:any)=>({ fontWeight: 300,
    textAlign: 'center'}))
 


const Top = styled(Box)(({theme}:any)=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
}))
  




const TopText = styled(Span)(({theme}:any)=>({
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '0px 10px'
}))
 


const Bottom = styled(Box)(({theme}:any)=>({
    display: 'flex',
    justifyContent: 'space-between'
}))
  

const Info = styled(Box)(({theme}:any)=>({
  flex: '3'
}))


export const Product = styled(Box)(({theme}:any)=>({
    display: 'flex',
    justifyContent: 'space-between'
}))
  
 

export const ProductDetail = styled(Box)(({theme}:any)=>({
    flex: 2,
    display: 'flex'
}))
  




export const Details = styled(Box)(({theme}:any)=>({
    padding: '20px',
    display: 'flex',
    marginLeft:'2vw',
    flexDirection: 'column',
    justifyContent: 'space-around'
}))
  




export const ProductColor = styled(Box)(({theme}:any)=>({
    width: '20px',
    height: '20px',
    borderRadius: '50%'
    
}))
  


const ProductSize = styled(Span)

export const PriceDetail = styled(Box)(({theme}:any)=>({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  
}))
  

export const ProductAmountContainer = styled(Box)(({theme}:any)=>({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
}))
  


export const ProductAmount = styled(Box)(({theme}:any)=>({
    fontSize: '24px',
    margin: '5px'
}))
  
  


export const ProductPrice = styled(Box)(({theme}:any)=>({
    fontSize: '20px',
    fontWeight: 200
}))
  
  





const Summary = styled(Box)(({theme}:any)=>({
    flex: 1,
    border: '0.5px solid lightgray',
    borderRadius: '10px',
    padding: '20px',
    height: '32vh',
    marginLeft:'2vh',
    width:'15vw',
    backgroundColor:'#2c2c2c',
    color:'white',
    
}))
  


const SummaryTitle = styled(H1)(({theme}:any)=>({
    fontWeight: 200,
    textAlign:'center'
}))
  


const SummaryItem = styled(Box)(({theme}:any)=>({
    margin: '1vw 3vw',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '400',
    fontSize: '18px'
}))
 
const Cart:FC = () => {
const {user}=useAuth()

const cart=useSelector(selectCart)
console.log(cart)
const dispatch=useDispatch<any>()
useEffect(()=>{
  dispatch(getCart(user?.email),[])
})
  

let total=0
for(let i=0;i<cart.length;i++){
total=total+Number(cart[i].discounted_price)
}
console.log(total)

const handlePayment=async()=>{
    
   
   
  const data_raw={
    "amount": total,
    "failure_url": "https://google.com",
    "product_delivery_charge": 0,
    "product_service_charge": 0,
    "product_code": "EPAYTEST",
    
    "signed_field_names": "total_amount,transaction_uuid,product_code",
    "success_url": `http://localhost:3000/dashboard/cart`,
    "tax_amount": 0,
    "total_amount":total,
    "transaction_uuid": crypto.randomUUID()
    }
const newt:any=await axios.post('http://localhost:8000/api/payment/initiate',data_raw)
const newP=newt.data

console.log(newP)
var form=document.createElement('form')
 form.setAttribute('method',"POST")
 form.setAttribute('action',"https://rc-epay.esewa.com.np/api/epay/main/v2/form")

 for(var key in newP){
  var hiddenfield=document.createElement('input')
  hiddenfield.setAttribute('type','text')
  
  hiddenfield.setAttribute('id',key)
  hiddenfield.setAttribute('name',key)
  hiddenfield.setAttribute('value',newP[key])
  hiddenfield.required=true
  form.appendChild(hiddenfield)
 }
 
 document.body.appendChild(form)
 form.submit()
  }
  
  
  // const cart=useSelector(selectCart)
  
  const navigate=useNavigate()
   useTitle("Cart")
   
   
  return (
    <Box maxHeight={'100vh'}>
      
      <Wrapper>
        <Title>My Cart</Title>
        <Top>
          <Button onClick={()=>navigate('/dashboard/shop')}>CONTINUE SHOPPING</Button>
          <TopText>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopText>
          <Button variant="outlined" >CHECKOUT NOW</Button>
        </Top>
        <Bottom>
          <Info>
          {cart.map((item:any,index:number)=>{return(<ProductDetails product={item}/>)})}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <Span>Subtotal</Span>
              <Span>Rs {total}</Span>
            </SummaryItem>
            <SummaryItem>
              <Span>Estimated Shipping</Span>
              <Span>Rs 0</Span>
            </SummaryItem>
            <SummaryItem>
              <Span>Shipping Discount</Span>
              <Span>{}</Span>
            </SummaryItem>
            <SummaryItem sx={{mb:1}}>
              <Span>Total</Span>
              <Span>{total}</Span>
            </SummaryItem>
            <Button variant='outlined' sx={{ml:'6vw'}} onClick={()=>handlePayment()} >CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      
    </Box>
  );
};

export default Cart;