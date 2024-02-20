import { Box, Button,Slider, Card, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Rating, Select, TextField, Typography } from '@mui/material'
import SelectInput from '@mui/material/Select/SelectInput'
import SearchInput from 'components/SearchInput'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { ProductDetail } from './Cart'
import ProductDetails from './ProductShops/ProductDetails'
import { H2, H3 } from 'components/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { FILTERPRODUCT, SETPRODUCT, selectSearchProd } from 'redux/productReducer'


const Search = () => {
    const filteredp=useSelector(selectSearchProd)
    const {text}=useParams()
    const [search,setsearch]=useState(text)
    const [contextsearch,setcontextsearch]=useState('true')
    const [product,setproduct]=useState <Array<Object>>([])
    const [price,setprice]=useState<number>(25000)
    const[rating,setrating]=useState(0)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    console.log(price,rating)
    console.log(contextsearch,price,rating)
    const marks=[{value:0,label:''},{value:20,label:'Rs 2000'},
    {value:50,label:'Rs 5000'},
{value:100,label:'Rs 10000'}]

    const valuetext=(value:Number)=>{
        return `Rs ${value}`
    }

const x=async()=>{
        const results:any=await axios.get(`http://127.0.0.1:4000/search/${text}`)
        const result:Array<Object>= results.data.result
        setproduct(result)
        dispatch(SETPRODUCT(result))
        dispatch(FILTERPRODUCT({text,result,price,rating}))
    }
useEffect(()=>{
   x()
    


},[text,price,rating])

const handleSearch=()=>{
navigate(`/dashboard/search/${search}`)
}
const handleKey=(e:any)=>{
    if(e.keyCode===13){
        handleSearch()
    }
}
  return (
    <Box>

    <Box ml={'65vw'}>
        <SearchInput value={search} onChange={(e)=>setsearch(e.target.value)} onKeyDown={handleKey}/>
        <Button sx={{marginLeft:'2vh',marginBottom:'1vh'}} variant='contained' color='primary' onClick={handleSearch}>Search</Button>
    </Box>
    <Box display={'flex'} mt={'1vw'}>

    <Card sx={{borderRadius:'2vw',width:'21vw',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',height:'35vw'}}>
        <FormControl>

        <RadioGroup value={contextsearch} onChange={(e,n)=>setcontextsearch(n)}>
        <FormLabel >Context Search</FormLabel>
        <FormControlLabel value={'true'} control={<Radio />} label="Enabled" />
        <FormControlLabel value={'false'} control={<Radio />} label="Disabled" />
        
        <hr/>
        </RadioGroup>
        </FormControl>
        <FormControl sx={{mt:'1vw'}}>
        <FormLabel>Price Range</FormLabel>
        {/* <Select sx={{width:'20vh',mt:'0.5vw',color:'black'}} placeholder='Price Range' value={price} onChange={(e)=>setprice(e.target.value)} label='Price' autoWidth>

        <MenuItem value="">
            <em>None</em></MenuItem>
            <MenuItem value={1000}>Below 1000</MenuItem>
            <MenuItem value={5000}>Below 5000</MenuItem>
            <MenuItem value={10000}>Below 10000</MenuItem>
        </Select>
         */}
         <Box sx={{width:250}}>

          <Slider
        aria-label="Custom marks"
        defaultValue={0}
        value={price/100}
        onChange={(e:Event,n:number|number[])=>setprice(n as number*100)}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        
        marks={marks}
        />
        </Box>
        </FormControl>
        <hr/>
        <FormControl sx={{mt:'2vw'}}>
            <FormLabel>Customer Reviews</FormLabel>
            <RadioGroup value={rating} onChange={(e,n)=>setrating(Number(n))}>
            <FormControlLabel value={1} control={<Radio />} label={<Box display={'flex'}><Rating value={1} readOnly></Rating><Typography>& up</Typography></Box>} />
            <FormControlLabel value={2} control={<Radio />} label={<Box display={'flex'}><Rating value={2} readOnly></Rating><Typography>& up</Typography></Box>} />
            <FormControlLabel value={3} control={<Radio />} label={<Box display={'flex'}><Rating value={3} readOnly></Rating><Typography>& up</Typography></Box>} />
            <FormControlLabel value={4} control={<Radio />} label={<Box display={'flex'}><Rating value={4} readOnly></Rating><Typography>& up</Typography></Box>} />
           
            </RadioGroup>
           
        </FormControl>
        

    </Card>
    <Card sx={{width:'65vw',ml:'5vw'}}>
        <H2 ml='1vh' mt='1vh'>Showing {filteredp.length} results for '{text}'</H2>
        {filteredp.map((item:any,index:Number)=>{
            return(
             <ProductDetails product={item} type={0}/>
            )
        })}

    </Card>
    </Box>
    </Box>
  )
}

export default Search