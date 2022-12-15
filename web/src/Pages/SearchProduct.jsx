import React from 'react'
import { useState } from 'react';
import {Box,TextField,Button,
  Container,styled,Avatar
,Paper,InputBase,IconButton,Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchProduct = () => {

  const [searchProduct, setSearchProduct] = useState('')
  return (
    <div>
      
     
      <Paper 
    
    sx={{ m:{lg:4,xs:2,sm:3},ml:{lg:"35%",xs:"15%",sm:"25%"},mb:"10px" ,p: '5px 10px', display: 'flex', alignItems: 'center', width: {xs:280,sm:500,lg:550} }}
  >
    
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search Product"
       onChange={(e)=>{
          setSearchProduct(e.target.value)
        }}
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton  type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    
  </Paper>
      
    
  </div>
  )
}

export default SearchProduct