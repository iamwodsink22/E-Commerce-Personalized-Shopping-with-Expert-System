import React,{FC} from 'react'
import { Add, Remove } from "@mui/icons-material";
import { Span } from 'components/Typography'
import { Box, Card, Rating, Typography } from '@mui/material';
import { Product,ProductDetail,ProductAmount,Details,PriceDetail,ProductPrice,ProductColor,ProductAmountContainer } from 'pages/Cart'
import { useNavigate } from 'react-router';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DeleteIcon from '@mui/icons-material/Delete';
interface ProductProps{
    product:any
    type:number
}
const ProductDetails:FC<ProductProps> = ({product,type}) => {
  const navigate=useNavigate()
  const handleView=(id:Number)=>{
    navigate(`/dashboard/view-product/${id}`)
}

  
  return (
    <Card sx={{pl:'2vw',mb:'1vh',mt:'1vw',color:'black',backgroundColor:'white',cursor:'pointer',borderRadius:'2vw'}} onClick={()=>handleView(product.product_id)}>
    <Product>
              <ProductDetail>
                <img style={{width:'80px',height:'80px', marginTop:'2vh'}} src={product.img_link} alt="hello" />
                <Details>
                  <Span >
                    <b>Product:</b> {product.product_name}
                  </Span>
                  <Span>
                    <b>ID:</b> {product.product_id}
                  </Span>
                  <ProductColor color={product.color} />
                  <Box display={'flex'}>
                    <Typography>Rating: </Typography><Rating value={product.ratings} readOnly/>
                  </Box>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>${product.discounted_price}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>Rs {(product.discounted_price*120).toFixed(2)}</ProductPrice>

              
              </PriceDetail>
              {type===1&&<DeleteIcon fontSize='large' sx={{mr:'2vw',mt:'3vw'}}/>}
              {type===2&&<ReceiptIcon fontSize='large' sx={{mr:'2vw',mt:'3vw'}}/>}
            </Product>
            </Card>
            
  )
}

export default ProductDetails
