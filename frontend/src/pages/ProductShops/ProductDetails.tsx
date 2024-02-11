import React,{FC} from 'react'
import { Add, Remove } from "@mui/icons-material";
import { Span } from 'components/Typography'
import { Card } from '@mui/material';
import { Product,ProductDetail,ProductAmount,Details,PriceDetail,ProductPrice,ProductColor,ProductAmountContainer } from 'pages/Cart'
interface ProductProps{
    product:any
}
const ProductDetails:FC<ProductProps> = ({product}) => {
  
  return (
    <Card sx={{pl:'2vw',mb:'1vh'}}>
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
                  <Span>
                    <b>Size:</b> {product.size}
                  </Span>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>${product.discounted_price}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>${product.discounted_price}</ProductPrice>
              </PriceDetail>
            </Product>
            </Card>
            
  )
}

export default ProductDetails
