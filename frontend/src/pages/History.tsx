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

const History = () => {
    const {user}=useAuth()
    const [clearedhistory,setclearedhistory]=useState(true)
    
    const navigate=useNavigate()
    useTitle("History")
    const id=user?.usr_id
    const dispatch=useDispatch<any>()
    
    
    const history=useSelector(selectHistory)
    useEffect(()=>{
        dispatch(getHistory(id))
        
    },[dispatch])
    const total=history.reduce(function(p:number,n:any){
        return p+Number(n.discounted_price)
    },0)
    const rating=history.reduce(function(p:number,n:any){
        return p+Number(n.ratings)
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

        {history.map((item:any,index:number)=>{return(<ProductDetails product={item} type={2}/>)})}
        </Box>
        <Summary>
            <SummaryTitle>Statistics</SummaryTitle>
            <SummaryItem>
              <Span>Bought Products</Span>
              <Span>{history.length}</Span>
            </SummaryItem>
            <SummaryItem>
                <Span>Average Ratings</Span>
                <Span>{(rating/history.length).toFixed(1)}</Span>
            </SummaryItem>
            <SummaryItem>
              <Span>Loyalty Point</Span>
              <Span>0</Span>
            </SummaryItem>
            <SummaryItem>
              <Span>Total Amount</Span>
              <Span>Rs {(total*120).toFixed(2)}</Span>
            </SummaryItem>
            {/* <SummaryItem sx={{mb:1}}>
              <Span>Total</Span>
              <Span>{total.toFixed(2)}</Span>
              </SummaryItem>
            */}
            <Button variant='outlined' sx={{ml:'6vw',mt:'3vw'}} onClick={handleClear}>Clear History</Button>
          
        </Summary>
    </Box>):(<Typography  textAlign={'center'}fontSize={50} mt={'2vw'}>Please Start Purchasing. Happy Shopping!</Typography>)}
            
            </Box>
  )
}

export default History