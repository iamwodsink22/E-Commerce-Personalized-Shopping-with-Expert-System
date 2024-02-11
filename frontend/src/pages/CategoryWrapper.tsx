import React from 'react'
import { Box, styled } from '@mui/material'

const Wrapper=styled(Box)(()=>({
    width:'100%',
    
}))

const CategoryWrapper = () => {
  return (
    <Wrapper>

    <img src='../../public/static/bgh.jpg'></img>
    </Wrapper>
  )
}

export default CategoryWrapper