import React,{FC} from 'react'
import { Add, Remove } from "@mui/icons-material";
import { Span } from 'components/Typography'
import { Card } from '@mui/material';
import { Product,ProductDetail,ProductAmount,Details,PriceDetail,ProductPrice,ProductColor,ProductAmountContainer } from 'pages/Cart';

interface ProductProps{
    product:any
}
const ProductDetails:FC<ProductProps> = ({product}) => {
  
  return (
    <Card sx={{pl:'2vw',mb:'1vh'}}>
    <Product>
              <ProductDetail>
                <div style={{width:'150px', backgroundColor:'white', justifyContent:'center', borderRight:'1px solid #E3E3E3', margin:'1vh 0vh 1vh 0vh'}}>
                  <img style={{width:'auto',height:'130px', marginTop:'2vh', position:'relative'}} src={product.img_link} alt="hello" />
                  </div>
                  
                
                <Details width={'20vw'} paddingLeft={'1vw'} style={{borderRight:'solid 1px #E3E3E3', margin:'1vh 0vw 1vh 0vw'}}>
                  <Span style={{marginLeft:'1vw', fontFamily:'Poppins', fontWeight:'500'}}>
                    {/* <b>Product:</b>  */}
                    {product.product_name}
                  </Span>
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
                <ProductAmountContainer style={{marginLeft:'-6vw'}}>
                  <Add />
                  <button>{product[product.id]}</button>
                  <Remove />
                  <ProductAmount style={{marginLeft:'3vw', fontFamily:'Poppins', fontSize:'20px', color:'grey'}}>${product.discounted_price}</ProductAmount>
                  <ProductPrice style={{marginLeft:'3vw', fontFamily:'Poppins', color:'black', fontWeight:'550'}}>${product.discounted_price*product[product.id]}</ProductPrice>
                  <img style={{marginLeft:'3vw'}} width={'45vw'} src='https://cdn.iconscout.com/icon/free/png-256/free-remove-320-451046.png' alt="" />
                  
                </ProductAmountContainer>
                
                
              </PriceDetail>
            </Product>
            </Card>
            
  )
}

export default ProductDetails
