import React,{useState,FC} from 'react'

import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,Typography,
    Tooltip,styled
  } from "@mui/material"
import { sidebarItems } from './SidebarItem'
const WorkedSidebar = styled(Box)(({ theme }:any) => ({
   ml:0,
    width: '20vw',
    height: "100%",
    left:0,
    
    transition: "left 0.3s ease",
    zIndex: theme.zIndex.drawer + 11,
    backgroundColor: '#555555',
    
  }));

const Sidebar:FC = () => {
    const [active, setactive] = useState('')

  return (
    <Box sx={{position:'absolute',top:0,left:0,height:'100%',width:'6vw',backgroundColor:'#f9fbff',display:'block',
    justifyContent:'center',pt:'5vh'}}>
        {sidebarItems.map((item,index)=>{return(
            <Box width={38} mb={10} ml={3} >
               <Tooltip title={item.name} placement='right' key={index}>
             <item.icon
                sx={{
                    color:
                    active === item.name ? "primary.main" : "secondary.400",cursor:'pointer'
                }}
                fontSize='large'
                onClick={()=>setactive(item.name)}
                />
                </Tooltip> 
          </Box>
        )})}
    </Box>
  )
}

export default Sidebar