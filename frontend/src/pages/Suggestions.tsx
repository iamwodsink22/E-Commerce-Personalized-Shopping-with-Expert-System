import React from 'react'
import { Box } from '@mui/material'




const Suggestions = ({products}:any) => {
  return (
    

   
    <Box style={{border:'solid 1px grey', width:'36vw', padding: '3px', borderRadius:'0px 0px 2px 2px', overflowY: 'auto', backgroundColor:'white'
     }} sx={{position:'absolute', maxHeight:'40vh'}} >
        {products.map((product:any) => (
            <Box style={{width: '98%', borderBottom:0, padding:'3px', height:'12vh'}} sx={{':hover': {fontStyle:'underlined',color:'grey', transition:'0.6s', transform:'scale(1.01)'}}}>
                <div key={product.id} style={{ width:'100%', display:'flex', height:'12vh', cursor:'pointer'}} >
                <span style={{fontFamily:'Poppins', width:'99%', alignSelf:'center', paddingRight:'5px', paddingLeft:'1.5vw', marginRight:'30px', color:'black'}}>{product.product_name.slice(0,50)}</span>
                <span style={{width:'15%', alignSelf:'center', border: 'solid 0.5px white'}}><img src={product.img_link} alt=""  style={{height:"40px", left:'0px'}}/></span>
                
                
            </div>
            <hr style={{alignSelf:'center', width:'95%'}}/>
            </Box>
            

        ))}
        <Box sx={{width:'100%', color:'#423EB5', textAlign:'center', marginBottom:'1vh', fontFamily:'Poppins', textDecoration:'underline', cursor:'pointer'}}>See more results</Box>
    </Box>
    
  )
}


export default Suggestions
