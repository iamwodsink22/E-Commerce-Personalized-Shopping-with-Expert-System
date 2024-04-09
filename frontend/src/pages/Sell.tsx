
import React, { ChangeEvent, useEffect, useState } from 'react'
import SearchProduct from './SearchProduct'
import axios from 'axios'
import Suggestions from './Suggestions'
import { Button, Box } from '@mui/material'
import { Height } from '@mui/icons-material'
import { useNavigate } from 'react-router'

type Product ={
  id: number,
  title:string,
  image: string
}


const Sell = () => {
  const navigate=useNavigate()
  const handleKey=(e:any)=>{
    if(e.key=='Enter'){
      navigate(`/dashboard/search/${query}`)
    }
  }
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>
  ([]);
  const [searchResults, setSearchResults] = useState<Product[]>([])
  useEffect(()=>{
    const fetchData = async() =>{
      const {data} = await axios.get("https://fakestoreapi.com/products");
      setProducts(data)
    }
    fetchData();
  },[]);
  function handleQueryChange(event:ChangeEvent<HTMLInputElement>){
    setQuery(event.target.value)
    setSearchResults(products.filter(product =>product.title.toLowerCase().includes(event.target.value.toLowerCase())
    )
    );
    console.log(searchResults)
  }
  return (
    <div style={{width:'38.4vw', marginLeft: '-6vw',marginTop:'0vh'}}>
      <Box sx={{display:'flex'}}><input type="text" style={{alignItems:'center', height:'5.6vh',width:'80%',borderRadius:'5px 0px 0px 0px', border:'solid 1px #EEEEEE', fontSize:'17px', fontFamily:'Poppins', paddingLeft: '15px', paddingRight:'3px'}} placeholder='&#x1F50E;&#xFE0E;  Search Products..' onChange={handleQueryChange} onKeyDown={handleKey}/>
      <Button sx={{borderRadius:'0px 5px 0px 0px',mr:'1vw',height:'6vh',backgroundColor:'#5783db'}} variant='contained'><img style={{height:'5.5vh'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png" alt="" onClick={()=>navigate(`/dashboard/search/${query}`)}/></Button>
      </Box>
      
      {query !== "" && searchResults.length > 0 && (
        searchResults.map(product =>  (
          <Suggestions products={searchResults}/>
        ))
      )}

      
    </div>
  )
}

export default Sell
