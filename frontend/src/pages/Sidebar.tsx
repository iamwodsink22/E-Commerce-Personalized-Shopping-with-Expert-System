import React,{useState,FC} from 'react'
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';

import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,Typography,
    Tooltip,styled,Modal
  } from "@mui/material"
import { sidebarItems } from './SidebarItem'

interface SidebarProps{
  sidebar:boolean
  setsidebar:React.Dispatch<boolean>
}

const WorkedSidebar = styled(Box)(({ theme }:any) => ({
   ml:0,
    width: '20vw',
    height: "100%",
    left:0,
    
    transition: "left 0.3s ease",
    zIndex: theme.zIndex.drawer + 11,
    backgroundColor: '#555555',
    
  }));

const Sidebar:FC<SidebarProps> = ({sidebar,setsidebar}) => {
    const [active, setactive] = useState('')

  return (
    

    <Box sx={{position:'absolute',top:'2vh',left:0,height:'100%',width:'6vw',backgroundColor:'transparent',display:'block',
    justifyContent:'center',pt:'5vh'}}>
      <Box mt='5vh'>
      {sidebar&&<KeyboardDoubleArrowLeftTwoToneIcon fontSize='large'sx={{cursor:'pointer',top:'2vh',left:'1.5vw',position:'absolute'}} onClick={()=>setsidebar(false)}/>}
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
    </Box>
              
  )
}

export default Sidebar