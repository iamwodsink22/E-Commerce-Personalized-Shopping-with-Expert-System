import { Box,Button, Typography } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { Span } from 'components/Typography'
import { useDispatch,useSelector } from 'react-redux'
import useTitle from 'hooks/useTitle'
import { getHistory, selectHistory,clearHistory } from 'redux/userReducer'
import useAuth from 'hooks/useAuth'
import ProductDetails from './ProductShops/ProductDetails'
import { useNavigate } from 'react-router'

import { Summary,SummaryItem,SummaryTitle } from './Cart'
import HistoryDetails from './ProductShops/HistoryDetails'
import axios from 'utils/axios'
import { getPureHistory, selectPureHist } from 'redux/productReducer'

const History = () => {
    const {user}=useAuth()
    const [clearedhistory,setclearedhistory]=useState(true)
    const[purehist,setpurehist]=useState()
    
    const navigate=useNavigate()
    useTitle("History")
    const id=user?.usr_id
    const dispatch=useDispatch<any>()
    
    
    useEffect(()=>{
      dispatch(getHistory(id))
      dispatch(getPureHistory(id))
      
    },[])
    const history=useSelector(selectHistory)
    const purehistory=useSelector(selectPureHist)
    const total=history.reduce(function(p:number,n:any){
        return p+Number(n.discounted_price)
    },0)
    const rating=purehistory.reduce(function(p:number,n:any){
        return p+Number(n.rating)
    },0)
    
    const handleClear=()=>{
        dispatch(clearHistory(id))
        setclearedhistory(false)
    }
  return (
    <Box>

        <Button onClick={()=>navigate('/dashboard')}>CONTINUE SHOPPING</Button>
{clearedhistory?(<Box display={'flex'}>
    <Box width={"70vw"}>

        {history.map((item:any,index:number)=>{return(<HistoryDetails product={item} rating={purehistory[index].rating} />)})}
        </Box>
        <Summary style={{fontFamily:'Poppins', backgroundColor:'#F8F8F8', color:'black', marginLeft:'-3vw', height:'45vh'}}>
            <SummaryTitle style={{fontWeight:'bold'}}>Statistics</SummaryTitle>
            <hr />
            <SummaryItem >
              <Span style={{width:'10vw', fontSize:'16px'}}>Products Bought : </Span>
              <Span style={{fontSize:'15px'}}>{history.length}</Span>
            </SummaryItem>
            <SummaryItem>
                <Span style={{width:'10vw', fontSize:'16px'}}>Average Ratings : </Span>
                <Span style={{fontSize:'15px'}}>{(rating/history.length).toFixed(1)}</Span>
            </SummaryItem>
            <SummaryItem>
              <Span style={{width:'10vw', fontSize:'16px'}}>Loyalty Point : </Span>
              <Span style={{fontSize:'15px'}}>0</Span>
            </SummaryItem>
            <SummaryItem>
              <Span style={{width:'10vw', fontSize:'16px'}}>Total Amount : </Span>
              <Span style={{fontSize:'15px'}}>Rs {(total*120).toFixed(2)}</Span>
            </SummaryItem>
            {/* <SummaryItem sx={{mb:1}}>
              <Span>Total</Span>
              <Span>{total.toFixed(2)}</Span>
              </SummaryItem>
            */}
            {/* <Button variant='outlined' sx={{ml:'6vw',mt:'3vw'}} onClick={handleClear}>Clear History</Button> */}
            <Box  onClick={handleClear} >
                <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="" style={{height:'5vh', marginLeft:'12vw', marginTop:'3vh', cursor:'pointer'}}/>
                <p style={{fontFamily:'Poppins', marginLeft:'10vw', marginTop:'-0.5vh' }}>Clear History</p>
            </Box>
          
        </Summary>
    </Box>):(<Typography  textAlign={'center'}fontSize={50} mt={'2vw'}>Please Start Purchasing. Happy Shopping!</Typography>)}
            
            </Box>
  )
}

export default History