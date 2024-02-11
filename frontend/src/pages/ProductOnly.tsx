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
const Container = styled(Box)


const Wrapper = styled(Box)(()=>({ padding: '50px',
    display: 'flex',

    // ${mobile({ padding: "10px", flexDirection:"column" })}
  }))
  
 

const ImgContainer = styled(Box)(()=>({
  width:'30vw',
  flex: 1,
}))
 

// const Image = styled(img)
//   
//   // ${mobile({ height: "40vh" })}
// `;

const InfoContainer = styled(Box)(()=>({
  flex: 1,
  padding: '0px 20px',
  maxHeight:'50vh'
  // ${mobile({ padding: "10px" })}
}))
 

// const Title = styled.h1`
//   font-weight: 200;
// `;

// const Desc = styled.p`
//   margin: 20px 0px;
// `;

// const Price = styled.span`
//   font-weight: 100;
//   font-size: 40px;
// `;

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
 


// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;

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
  


// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

// const Button = styled.button`
//   padding: 15px;
//   border: 2px solid teal;
//   background-color: white;
//   cursor: pointer;
//   font-weight: 500;

//   &:hover{
//       background-color: #f8f4f4;
//   }
// `;

const Product = () => {
    const dispatch=useDispatch<any>()
    const [quantity,setquantity]=useState(1)
    const { logout, user } = useAuth();
    const product=useSelector(selectProduct)
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
      }
      
  useEffect(()=>{
   dispatch(getProduct(id))
   dispatch(getRecProduct(id))
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
        
        <ImgContainer>
          <img style={{width: '30vw',
height: '80vh',
objectFit: 'cover'}} src={product.img_link} />
        </ImgContainer>
        <Box display={'block'} justifyContent={'center'} position={'absolute'} left='45vw'>
        <InfoContainer>
          <H3 textAlign={'center'}>{product.product_name}</H3>
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
          <Typography mt='1vw'>
            {product.about_product}
          </Typography>
          
          {/* <FilterContainer>
            <Filter>
              <span style={{fontSize: '20px',
  fontWeight: '200'}}>Color</span>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter> */}
            {/* <Filter>
              <H4>Size</H4>
              <FormControl>

               <Select>
                <SelectInput value={'SX'}>XS</SelectInput>
                <SelectInput>S</SelectInput>
                <SelectInput>M</SelectInput>
                <SelectInput>L</SelectInput>
                <SelectInput>XL</SelectInput>
              </Select>
            
            </Filter> */}
          {/* </FilterContainer> */}
          
          </InfoContainer>
<Box position={'absolute'} left='10vw'>

        
            <AmountContainer>
              <Typography > Quantity &nbsp;&nbsp;</Typography>
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
           
        
          
        
        <Box display={'flex'} mt={'1vw'} ml={'2vw'}>
          
        <Button sx={{backgroundColor:'black',mr:'1vw',cursor:'pointer'}} onClick={handleCart}><AddShoppingCartIcon fontSize='small'/> Add to Cart</Button>
        
      


        <Button sx={{backgroundColor:'skyblue',cursor:'pointer'}}
         onClick={(product)=>handlePayment(product)}
         ><CreditCardIcon fontSize='small'/> Order Now</Button>
          
         </Box>
      <Box sx={{border:'3px solid gray',height:'44vh',maxWidth:'25vw',textAlign:'left', marginTop:'1vw',backgroundColor:'white'}}>
    {/* <Box display={'flex'}>
        {product.categories.map((item:any,index:number)=>{return(
          <Typography fontSize={12} fontWeight={600}>&gt;{item}</Typography>
          )})}
          </Box>
        <hr/> */}
        

      <H3>Buy New:&nbsp;&nbsp;&nbsp;${product.discounted_price}</H3>
      <H4 mt={'0.5vw'}>Actual Price: &nbsp;&nbsp;<s color='red'>${Number(product.discounted_price)+25}</s></H4>
      <H4 mt={'0.5vw'}>You save: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${25}</H4>
      <H4  mt={'1vh'}>In Stock: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Y</H4>
      <hr/>
     
      <Typography mt='0.3vw'>Is Amazon Seller: {product['Is Amazon Seller']}</Typography>
      <Typography mt={'0.7vw'}>Return: <Typography fontSize={12} color={(theme)=>theme.palette.primary.main}>Eligible for Return, Refund or Replacement within 30 days of receipt</Typography></Typography>
      
         <hr/>
         <Box display={'flex'}>
      
      <LocationOnIcon/><Typography color={(theme)=>theme.palette.primary.main} >Delivery to location</Typography>
      </Box>
      <H4 mt='0.5vw'>Model number: {product['Model Number']}</H4>
      <H4 mt='0.5vw'>Shipping Weight: {product['Shipping Weight']}</H4>
      
    </Box>
      </Box>
    
    
    
      
        </Box>
     
    </Wrapper>
      
      
  </>
    
  );
};

export default Product;