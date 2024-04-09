import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {Box,styled,Button, Typography, FormControl,Rating} from "@mui/material";
import { useEffect,useState } from "react";
import Select from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Announcement from 'components/Announcement';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import {useSelector,useDispatch} from 'react-redux'
import useAuth from "hooks/useAuth";
import useTitle from 'hooks/useTitle'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { ADD_CART, Add2Cart } from 'redux/cartReducer';
import toast from 'react-hot-toast';
import { getProduct, getRecProduct, selectCRecproduct,selectIRecproduct, selectElecproduct, selectProduct } from 'redux/productReducer';
import { H3, H4 } from "components/Typography";
import SelectInput from "@mui/material/Select/SelectInput";
import ExpandableParagraph from 'components/ExpandableParagraph';
const Container = styled(Box)


const Wrapper = styled(Box)(()=>({ padding: '50px',
    display: 'flex',

    // ${mobile({ padding: "10px", flexDirection:"column" })}
  }))
  
 

const ImgContainer = styled(Box)(()=>({
  width:'30vw',
  flex: 1,
}))
 

const InfoContainer = styled(Box)(()=>({
  flex: 1,
  padding: '0px 20px',
  maxHeight:'50vh'
  // ${mobile({ padding: "10px" })}
}))
 

const FilterContainer = styled(Box)(()=>({
  width: '50%',
  margin: '30px 0px',
  display: 'flex',
  justifyContent: 'space-between'

}))
 


const Filter = styled(Box)(()=>({
  display: 'flex',
  alignItems: 'center',
}))
 




const FilterColor = styled(Box)(()=>({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  // background-color: ${(props) => props.color},
  margin: '0px 5px',
  cursor: 'pointer',
}))
 
const AddContainer = styled(Box)(()=>({
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // ${mobile({ width: "100%" })}
}))
  


const AmountContainer = styled(Box)(()=>({
  marginTop:'1vw',
  display: 'flex',
  marginLeft:'5vw',
  alignItems: 'center',
  fontWeight: '700'
}))
  




const Product = () => {
    const dispatch=useDispatch<any>()
    const [quantity,setquantity]=useState(1)
    const { logout, user } = useAuth();
    const product=useSelector(selectProduct)
    const rec=useSelector(selectCRecproduct)
   
    
    const {id}:any=useParams()
    
    
    const navigate=useNavigate()
    const handlePayment=async(x:any)=>{
    const uuid=crypto.randomUUID()
     
     
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
        "transaction_uuid": uuid
        }
    const newt=await axios.post('http://localhost:8000/api/payment/initiate',data_raw)
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
     const done=await axios.post('http://localhost:8000/api/transaction/add',{user_id:user?.usr_id,product_id:id,rating:product.ratings,timestamp:Date.now()})
     console.log(done)
      }
      
  useEffect(()=>{
   dispatch(getProduct(id))
  },[dispatch,id])
      useTitle("View Product")
      const handleCart=()=>{
        const cart={'email':user?.email,'products':[{'product_id':product.product_id,'quantity':quantity}]}
      dispatch(Add2Cart(cart))
      toast.success("Item added to Cart")
      }
    
      const handleView=(id:any)=>{
        navigate(`/dashboard/view-product/${id}`)
      } 
    const rec_index=Math.floor(Math.random()*(rec.length-5))
    
    const new_rec=rec.slice(rec_index,rec_index+5)
  return (
    
      <>
    <Announcement/>
      <Wrapper>
        
        <ImgContainer >
          <img style={{width: '30vw',border: 'solid 1px #e3e3e3', borderRadius:'5px',
height: '80vh',
objectFit: 'cover',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} src={product.img_link} />
        </ImgContainer>
        <Box display={'block'} justifyContent={'center'} position={'absolute'} left='45vw'>
        <InfoContainer>
          <H3 style={{alignItems:'left', fontSize:'5vh', fontWeight:'bold', fontFamily: 'sans-serif', marginBottom: '3vh'}}>{product.product_name}</H3>
          <Box display={'flex'} mt={'1vh'}>
            {/* <Typography color={(theme)=>theme.palette.primary.main}>Rating</Typography> */}
            {/* <Typography ml='1vw'>{product.ratings}</Typography> */}
        <Rating style={{alignItems:'left'}} 
        
              name="read-only"
              
              defaultValue={product.ratings}
              readOnly
              sx={{ my: "3px" }}
              />
              <Typography color={(theme)=>theme.palette.primary.main} ml='1vw'>1463 Ratings</Typography>
              
        </Box>
        <hr style={{color:'#4e4e4e', height: '3px'}}/>

        <Box paddingTop={'0.2vh'} paddingBottom={'1vh'}>
          <span style={{fontFamily:'Poppins',fontSize:'3.5vh',color:'#5d5d5d', fontWeight:'bold', marginLeft:'0.3vw'}}><s>${Number(Number(product.discounted_price)+((5/100)*Number(product.discounted_price))).toPrecision(3)}</s></span>
          &nbsp; &nbsp;  
          <span style={{fontFamily:'Poppins',fontSize:'4vh', fontWeight:'bold'}}>${Number(product.discounted_price)}</span>
          <p style={{fontFamily:'Poppins', fontSize:'2.1vh', fontWeight:'bold', marginTop:'0.4vh', color:'#4f4f4f'}}>You save:   <span style={{fontWeight:'normal'}}>${((Number(Number(product.discounted_price)+((5/100)*Number(product.discounted_price)))-Number(product.discounted_price))).toPrecision(1)}</span> </p>
          
        </Box>
        
          {/* <Typography mt='1vw'>
            {product.about_product}
          </Typography> */}

          <Box><ExpandableParagraph text = {product?.about_product}  maxLength={300} /></Box>
          
          
          
          
          </InfoContainer>
<Box position={'relative'} left='10vw' marginTop={'10vh'}>

        
            <AmountContainer paddingTop={'10vh'}>
              <Typography style={{fontFamily:'Poppins'}}> Quantity &nbsp;&nbsp;</Typography>
              <RemoveIcon sx={{cursor:'pointer'}} onClick={()=>{quantity>=1?setquantity(quantity-1):setquantity(0)}} />
              <span style={{width: '30px',
  height: '30px',
  borderRadius: '10px',
  border: '1px solid teal',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0px 5px'}}>{quantity}</span>
              <AddIcon sx={{cursor:'pointer'}} onClick={()=>setquantity(quantity+1)} />
              
            </AmountContainer>
           
        
          
        
        <Box display={'flex'} mt={'1vw'} ml={'2vw'} paddingTop={'2vh'}>
          
        <Button sx={{color:'white', backgroundColor:'#5783db',mr:'1vw',cursor:'pointer', ':hover':{backgroundColor:'white', color:'#5783db', border: '1px solid #5783db', transform:'scale(1.05)'}}} onClick={handleCart}><AddShoppingCartIcon fontSize='small'/> Add to Cart</Button>
        
      


        <Button sx={{backgroundColor:'white', color:'#5783db',mr:'1vw',cursor:'pointer', ':hover':{color:'white', backgroundColor:'#5783db', transform:'scale(1.05)'}}}
         onClick={(product)=>handlePayment(product)}
         ><CreditCardIcon fontSize='small'/> Order Now</Button>
          
         </Box>
      <Box sx={{border:'none', height:'30vh',maxWidth:'25vw',textAlign:'left', marginTop:'3vw',backgroundColor:'white', padding: '0.5vh 1vw', borderRadius:'4px'}}>
    {/* <Box display={'flex'}>
        {product.categories.map((item:any,index:number)=>{return(
          <Typography fontSize={12} fontWeight={600}>&gt;{item}</Typography>
          )})}
          </Box>
        <hr/> */}
        

      
      <Typography mt={'0.7vw'} style={{fontWeight:'bold', marginBottom:'1vw', fontFamily:'Poppins', fontSize:'17px'}}>Return: <Typography style={{color:'black', fontFamily:'Poppins'}} fontSize={12} color={(theme)=>theme.palette.primary.main}>Eligible for Return, Refund or Replacement within 30 days of receipt</Typography></Typography>
      
         <hr/>
         <Box display={'flex'} marginTop={'1vw'} alignContent={'center'}>
      
      <LocationOnIcon/>&nbsp; <Typography style={{fontFamily:'Poppins'}} color={(theme)=>theme.palette.primary.main} >Deliver to location</Typography>
      </Box>
      <H4 mt='0.5vw' style={{fontFamily:'Poppins'}}><span style={{fontWeight:'bold'}}>Model number: </span>{product['Model Number']}</H4>
      <H4 mt='0.5vw' style={{fontFamily:'Poppins'}}><span style={{fontWeight:'bold'}}> Shipping Weight: </span>{product['Shipping Weight']}</H4>
      
    </Box>
      </Box>
    
    
    
      
        </Box>
     
    </Wrapper>
      
      
  </>
    
  );
};

export default Product;