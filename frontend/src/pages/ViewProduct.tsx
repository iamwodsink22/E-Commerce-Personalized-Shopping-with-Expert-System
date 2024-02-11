import { Box, Card, Typography, styled,Rating, Button } from '@mui/material'
import { H1, H3,H2, H4,Small } from 'components/Typography'
import React,{FC, Fragment,useEffect,useState} from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import FlexBox from 'components/FlexBox';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useTitle from 'hooks/useTitle'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import useAuth from "hooks/useAuth";

import { Swiper, SwiperSlide } from 'swiper/react';
import { productList } from './ProductList'
import { useNavigate, useParams } from 'react-router';
import { TypeSpecimenOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CART, Add2Cart } from 'redux/cartReducer';
import axios from 'axios';
import { getProduct, getRecProduct, selectCRecproduct,selectIRecproduct, selectElecproduct, selectProduct } from 'redux/productReducer';
import toast from 'react-hot-toast';
import Secred from './ProductShops/Secred';


const ViewProductWrapper=styled(Box)(()=>({
    display:'flex',
    
    marginTop:'2vh',
    // justifyContent:'center',
    textAlign:'center',
    width:'95vw',
    marginLeft:'0vw',
  
}))

const ViewProduct:FC = () => {

  // const [product,setproduct]=useState(Object)
  // const[rec,setrec]=useState(Array)
  // const[pid,setpid]=useState(String)
  
  const dispatch=useDispatch<any>()
  const { logout, user } = useAuth();
  const product=useSelector(selectProduct)

function getSpecs(){  
  const x=product['Product Specification']

  if(x){
  const y=x.split('|')
  console.log(y)
  // y.splice(1,1)
  y.splice(2,1)
  y.splice(2,1)
  y.splice(2,1)
  y.splice(3,1)
  y.splice(3,1)
  return y
  }
  else return null
  
}
  // y.splice(5,1)
  // y.splice(6,1)

 
  
  

  const rec=useSelector(selectCRecproduct)
  const irec=useSelector(selectIRecproduct)
  
  const {id}:any=useParams()
  
  
  const navigate=useNavigate()
  const handlePayment=async(x:any)=>{
    
   
   
    const data_raw={
      "amount": Math.ceil(product.discounted_price*120),
      "failure_url": "https://google.com",
      "product_delivery_charge": 0,
      "product_service_charge": 0,
      "product_code": "EPAYTEST",
      
      "signed_field_names": "total_amount,transaction_uuid,product_code",
      "success_url": `http://localhost:3000/dashboard/view-product/${id}`,
      "tax_amount": 0,
      "total_amount":Math.ceil(product.discounted_price*120),
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
    
useEffect(()=>{
 dispatch(getProduct(id))
 dispatch(getRecProduct(id))
},[dispatch,id])
    useTitle("View Product")
    const handleCart=()=>{
      const cart={'email':user?.email,'products':[{'product_id':product.product_id,'quantity':1}]}
    dispatch(Add2Cart(cart))
    toast.success("Item added to Cart")
    }
  
    const handleView=(id:number)=>{
      navigate(`/dashboard/view-product/${id}`)
    } 
  const rec_index=Math.floor(Math.random()*(rec.length-5))
  
  const new_rec=rec.slice(rec_index,rec_index+5)
  
  return (
    <>
    <ViewProductWrapper>
    <Box mr='1vw' marginTop={'auto'} marginBottom={'auto'}>
        <img style={{width:'16vw',height:'40vh'}} src={product.img_link} placeholder='imgs' alt='imgs'/>
    </Box>
    <Card sx={{display:'block',padding:'2vh',maxHeight:'105vh',marginRight:'2vw', borderRadius:'3vh',maxWidth:'35vw'}}>
        <H1 color={(theme)=>theme.palette.primary.main}>{product.product_name}</H1>
        <Box display={'flex'} mt={'1vh'} justifyContent={'center'}>
            {/* <Typography color={(theme)=>theme.palette.primary.main}>Rating</Typography> */}
            {/* <Typography ml='1vw'>{product.ratings}</Typography> */}
        <Rating 
        
              name="read-only"
              
              defaultValue={product.ratings}
              readOnly
              sx={{ my: "3px" }}
              />
              <Typography color={(theme)=>theme.palette.primary.main} ml='1vw'>1463 Ratings</Typography>
              
        </Box>
        <Box textAlign={'left'} mt='1vw'>

        <Typography color={(theme)=>theme.palette.primary.main}>Company : Amazon</Typography>
        
        <Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>Actual Price: $ {product.discounted_price}</Typography>
        {getSpecs()?getSpecs().map((item:String,index:number)=>{return(<Typography mt={'1vw'} color={(theme)=>theme.palette.primary.main}>{item}</Typography>)}):null}
        
        </Box>
        
        <Typography mt={'2vw'} color={(theme)=>theme.palette.primary.main}>Description:</Typography>
        <Typography>{product.about_product}</Typography>
        <Box mt={'5vh'} p='0.5vw' sx={{color:'white'}}>

        
        </Box>

    </Card>

    <Box sx={{border:'3px solid gray',height:'58vh',maxWidth:'35vw',textAlign:'left', ml:'2vw', backgroundColor:'white'}}>
    <Box display={'flex'}>
        {product.categories.map((item:any,index:number)=>{return(
        <Typography fontSize={12} fontWeight={600}>&gt;{item}</Typography>
)})}
        </Box>
        <hr/>
        

      <H3>Buy New:&nbsp;&nbsp;&nbsp;${product.discounted_price}</H3>
      <H4 mt={'0.5vw'}>Actual Price: &nbsp;&nbsp;<s color='red'>${Number(product.discounted_price)+25}</s></H4>
      <H4 mt={'0.5vw'}>You save: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${25}</H4>
      <H4  mt={'1vh'}>In Stock: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Y</H4>
      <hr/>
      <Box display={'flex'} mt={'2vh'} ml={'7vw'}>
      
      <LocationOnIcon/><Typography color={(theme)=>theme.palette.primary.main} >Deliver to location</Typography>
      </Box>
      
      <Box sx={{display:'block', ml:'8vw', mt:'2vh'}}>
        <Box>


      <Button sx={{backgroundColor:'black',mr:'1vw',cursor:'pointer'}} onClick={handleCart}><AddShoppingCartIcon fontSize='small'/> Add to Cart</Button>
        </Box>
        <Box mt='1vw' ml='1vh'>


        <Button sx={{backgroundColor:'skyblue',cursor:'pointer'}}
         onClick={(product)=>handlePayment(product)}
         ><CreditCardIcon fontSize='small'/> Order Now</Button>
        </Box>
         </Box>
         <hr/>

      <Typography mt='0.3vw'>Is Amazon Seller: {product['Is Amazon Seller']}</Typography>
      <Typography mt={'0.7vw'}>Return: <Typography fontSize={12} color={(theme)=>theme.palette.primary.main}>Eligible for Return, Refund or Replacement within 30 days of receipt</Typography></Typography>
      {/* <H2>Technical details </H2>
      <Typography>{product['Technical Details']}</Typography>
       */}

    
    </Box>
    

<Secred products={irec}  title={'Users who liked this also liked'} colour={'#cccccc'}/>
    
    </ViewProductWrapper>
      

      </>
  )
}

export default ViewProduct