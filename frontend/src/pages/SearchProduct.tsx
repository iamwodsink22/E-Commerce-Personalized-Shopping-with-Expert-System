import SearchInput from 'components/SearchInput'
import { Button,Box } from '@mui/material'
import React,{FC,useState} from 'react'
import { useNavigate } from 'react-router'

const SearchProduct :FC = () => {

    const [search,setsearch]=useState('')
    const navigate=useNavigate()
    const handleSearch=()=>{
         navigate(`/dashboard/search/${search}`)
    }
  return (
    <Box display='flex' sx={{ml:'50vw'}}>
    <Button sx={{borderRadius:'10vh',mr:'1vw',height:'5vh',mt:'0.5vh'}}color='primary' variant='contained' onClick={handleSearch}>Search</Button>
    <SearchInput placeholder='Search Product' value={search} onChange={(e)=>setsearch(e.target.value)}/>
    </Box>
  )
}

export default SearchProduct