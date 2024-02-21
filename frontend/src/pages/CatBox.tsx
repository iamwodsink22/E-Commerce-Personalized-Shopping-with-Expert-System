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
      navigate(`category/${title}`)
    }
    
  return (
    
<Card sx={{'&:hover':{width:'20vw',height:'34vh',boxShadow:'3px 3px black'},width:'20vw',height:'33vh',color:'black',textAlign:'center',ml:'2vw',backgroundColor:'lightslategrey',boxShadow:'8px 2px 2px 2px black',borderRadius:'2vh',z_index:'2'}}>
    <Typography  fontWeight={800}>{title}</Typography>
    
        
<span><img style={{width:'18vw',height:'26vh'}} src={`static/${title}.jpg`}/></span>
        <Typography style={{marginTop:'0.5vh',cursor:'pointer'}} onClick={handleClick}>See More</Typography>
        </Card>
        
  )
}

export default CatBox