import SearchInput from 'components/SearchInput'
import { Button,Box } from '@mui/material'
import React,{FC,useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
type Product = {
  id: number,
  title: string,
  image: string
}



const SearchProduct :FC = () => {
    const [query,setQuery]=useState('');
    // const [products, setProducts] = useState<Product[]>
    // ([]);
    // const [searchResults, setSearchResults] = useState<Product[]>
    // ([])
    // useEffect(() => {
    //   const fetchData = async() =>{
    //     const {data} = await axios.get("https://fakestoreapi.com/products");
    //     setProducts(data)
    //   }
    //   fetchData()
    // },[]);
    // function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    //   setQuery(event.target.value);
    //   setSearchResults(
    //     products.filter((product) =>
    //       product.title.toLowerCase().includes(event.target.value.toLowerCase())
    //     )
    //   );
     
    // }


    



  return (
    <Box display='flex' sx={{ml:'-6vw'}} width={'40vw'}>
      <Box width={'100%'}>
      <SearchInput style={{width:'100%', height:'7vh', border:'5px 0px 0px 5px'}} placeholder='Search Product' value={query} onChange={(e)=>setQuery(e.target.value)}/>
    {/* {query !=="" && searchResults.length > 0 && (
      searchResults.map(product => (
        <div style={{width: '100%', height:'auto', backgroundColor:'white', color:'black'}}>{product.title}</div>
      ))
    )} */}

      </Box>
    
        <Button sx={{borderRadius:'0px 5px 5px 0px',mr:'1vw',height:'7vh',backgroundColor:'#5783db'}} variant='contained'><img style={{height:'5.5vh'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png" alt="" /></Button>
        
    </Box>
  )
}

export default SearchProduct