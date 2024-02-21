import { Box, Typography } from '@mui/material'
import { H3, H4 } from 'components/Typography'
import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
    <Box position={'relative'} top={'45vh'}>
        <Box   sx={{backgroundColor:'#232f3e',color:'white',height:'35vh'}}>
            <Box display={'flex'} justifyContent={'center'}>
           
            <Box mt={'2vw'}>
                <H3>
                    Get to Know us
                </H3>
                <ul>
                    <li>Careers</li>
                    <li style={{marginTop:'2vh'}}>Blog</li>
                    <li style={{marginTop:'2vh'}}>About Us</li>
                    <li style={{marginTop:'2vh'}}>Relations</li>
                </ul>
            </Box>
            <Box ml={'5vw'} mt={'2vw'}>
                <H3 ml={'2vw'}>
                    Make Money with Us
                </H3>
                <ul>
                    <li>Sell Products on Ecommerce</li>
                    <li style={{marginTop:'2vh'}}>Advertise your Products</li>
                    <li style={{marginTop:'2vh'}}>Make Connections with vendors</li>
                </ul>
            </Box>
            <Box ml='5vw' mt={'2vw'}>
                <H3 ml='2vw'>
                    Payments
                </H3>
                <ul>
                    <li>Ecommerce Business Card</li>
                    <li style={{marginTop:'2vh'}}>Ecommerce Currency Converter</li>
                    <li style={{marginTop:'2vh'}}>Shop with Points</li>
                    <li style={{marginTop:'2vh'}}>Reload Balance</li>
                </ul>

            </Box>
            <Box ml='5vw' padding={'0 1vw'} mt={'2vw'}>
                <H3>
                    Contact Us
                </H3>
                <TwitterIcon/>
                <FacebookIcon/>
                <InstagramIcon/>
                <GitHubIcon/>

            </Box>
            </Box>

        </Box>
        <Box  color={'white'} sx={{backgroundColor:'#131a22'}}>
        <Box display={'flex'} justifyContent={'space-between'} ml='20vw' mr='20vw'>
            <Typography mt={'2vw'}>Condition of Use</Typography>
            <Typography mt={'2vw'}>Privacy Notice</Typography>
            <Typography mt={'2vw'}>Advertisements</Typography>
            </Box>
           

            
            <H4 mt='2vw' textAlign={'center'}>©Ecommerce Inc, 2022-2024, or its Affilates</H4>
            
        <H4 textAlign={'center'}>All Rights Reserved</H4>
        </Box>
    </Box>
  )
}

export default Footer