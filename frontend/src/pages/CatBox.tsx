import { Box,Card, Typography } from '@mui/material'
import React,{FC} from 'react'
import FlexBox from 'components/FlexBox'
import { Small,H4 } from 'components/Typography'

import {Rating} from '@mui/material'
import { useNavigate } from 'react-router'

interface Catprops{

title:String
}

const CatBox:FC<Catprops> = ({title}) => {
    console.log("hello")
    
    const navigate=useNavigate()

    const handleClick=()=>{
      navigate(`category/${title}`);
      window.scroll(0,0)
    }
    
  return (
    
<Card sx={{':hover':{ transform:'scale(1.01)', transition:'1s'}}} style={{marginBottom:'4vh',marginTop:'3vh', height:'38vh', cursor:'pointer', width:'100%', marginLeft:'-2vw', marginRight:'-2vw' }} onClick={handleClick}>
    <Typography  fontWeight={500} style={{fontFamily:'Roboto', alignContent:'center', marginBottom:'0.5vh', fontSize:'20px', marginLeft:'3vw', marginTop:'0.5vh'}}>{title}</Typography>
    <div style={{backgroundColor:'black', objectPosition:'50% 50%'}}>
    <img style={{width:'100%', height:'auto', }} src={`static/${title}.png`}/>
    

    </div>
    
        
{/* <div style={{width: '20vw', height:'20vh', backgroundColor:'black', alignItems:'center'}}><img style={{objectFit:'none'}} src={`static/${title}.jpg`}/></div> */}
        {/* <Typography style={{marginTop:'0.5vh',cursor:'pointer'}} onClick={handleClick}>See More</Typography> */}
        </Card>
        
  )
}


export default CatBox