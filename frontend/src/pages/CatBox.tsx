import { Box,Card, Typography } from '@mui/material'
import React,{FC} from 'react'
import FlexBox from 'components/FlexBox'
import { Small,H4 } from 'components/Typography'
import TextSlicer from 'components/TextSlicer'
import {Rating} from '@mui/material'
import { useNavigate } from 'react-router'

interface Catprops{

title:String
products:any
}

const CatBox:FC<Catprops> = ({title,products}) => {
    console.log("hello")
    
    const navigate=useNavigate()

    const handleClick=()=>{
      navigate(`category/${title}`);
      window.scroll(0,0)
    }
    const handleView=(id:number)=>{
      navigate(`/dashboard/view-product/${id}`)
    }
    
  return (
    
<Card sx={{':hover':{ transform:'scale(1.01)', transition:'1s'}}} style={{marginBottom:'4vh',marginTop:'3vh', height:'60vh', cursor:'pointer', width:'100%', marginLeft:'-2vw', marginRight:'-2vw',color:'black' }} >
    <Box display={'flex'} justifyContent={'space-between'} mt='2vh'><Typography  fontWeight={800} style={{fontFamily:'Roboto', alignContent:'center', marginBottom:'0.5vh', fontSize:'20px', marginLeft:'3vw', marginTop:'0.5vh'}}>{title}</Typography><Typography  fontWeight={800} sx={{color:'blue',float:'right',marginTop:'1vh',marginRight:'1vw'}} onClick={handleClick}>{"See More >" }</Typography></Box>
    <Box sx={{display:'grid',gridTemplateColumns: 'auto auto auto auto',marginTop:'0.5vh', ml:'1vw'}}>
        {products.slice(0,4).map((item:any,index:number)=>{
            return(
                <Card style={{height:'51vh', width: '22vw', borderRadius:'7px'}} sx={{display:'inline-grid', justifyContent:'center',margin:'1vw',marginBottom:'1vw',height:'27vh',width:'20vw',cursor:'pointer', ':hover':{transform:'scale(1.05)', transition:'1s' }}} onClick={()=>{handleView(item.product_id); window.scrollTo(0,0)}} >
                     <div style={{objectFit:'cover' , width: '100%',  height: '30vh', alignItems:'center', borderRadius:'7px 7px 0px 0px', }}><img style={{marginTop:'7vh',position:'absolute', marginLeft:'3vw'}} src={item.img_link} alt="Men Keds" width="auto" height='150px'/></div>
                     <hr style={{borderWidth:'0',width:'100%', height:'1px', backgroundColor:'#E3E3E3', marginTop:'-1vh'}}/>

<Box paddingLeft={'1vw'} display="flex" justifyContent='center'flexDirection='column' ml="0.5rem" mr='1vw' mt='-1.5vh'>
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
  <p style={{fontFamily:'Poppins', fontWeight:'600', fontSize:'18px', marginBottom:'-0.5vh', marginTop:'0.5vh'}}>Rs {Math.ceil(item.discounted_price*120)}</p>
</Box>
                </Card>
            )
        })}
        </Box>
    
        
{/* <div style={{width: '20vw', height:'20vh', backgroundColor:'black', alignItems:'center'}}><img style={{objectFit:'none'}} src={`static/${title}.jpg`}/></div> */}
        {/* <Typography style={{marginTop:'0.5vh',cursor:'pointer'}} onClick={handleClick}>See More</Typography> */}
        </Card>
        
  )
}


export default CatBox