import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Box,TextField,Button,
  Container,styled,Avatar,Grid,Typography,CardMedia
,Paper,InputBase,IconButton,Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:3000";
} else {
  baseUrl = "https://wild-pink-bat-tam.cyclic.app/";
}
const SearchProduct = () => {
const [searchData, setSearchData] = useState([])
  const [searchProduct, setSearchProduct] = useState('')
  const [loadProduct, setLoadProduct] = useState(false)
  const ProductSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(`${baseUrl}/product/${searchProduct}`);
    
      setSearchData(response.data.data);
     
      console.log(response.data.data);
      setLoadProduct(!loadProduct)
    } catch (err) {
      console.log("err", err);
    }
  };
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
    <IconButton  onClick={ProductSearch} type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    
  </Paper>
      
  <Grid sx={{m:{xs:1,sm:5,lg:3}}} container item spacing={6}>
         {(!searchData) ? null :
        searchData?.map((eachProduct, index) => ( 
          <Paper
          
          key={index}
            elevation={4}
            sx={{ m:{xs:2,lg:2,sm:1},mb:"5px",  width: '100%', maxWidth:{ lg:300,xs:320,sm:300}, bgcolor: 'background.paper' }}>

            <Box sx={{ width: '100%', maxWidth:{ lg:300,xs:320,sm:300}, bgcolor: 'background.paper' }}>
             
              
              
               <CardMedia
                component="img"
                width="250"
                height="250"
                // image='https://www.shutterstock.com/image-vector/sunscreen-product-banner-ads-on-260nw-1509241181.jpg'
                 image={eachProduct.productImage}
                alt="green iguana"
              />
              <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {eachProduct.name}
                      {/* sdsd */}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                      ${eachProduct.price}
                      {/* sdfsdf */}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                  {/* dsdsdsd */}
                  {eachProduct.description}
                </Typography>
                
              </Box>
              <Divider variant="middle" />

              <Box sx={{
                display: "flex", justifyContent: "space-evenly",
                m: 1, p: 1
              }}>
                {/* <Button
                //  onClick={AddTheProduct}
                onClick={() => {
                  getAProduct(eachProduct._id)
                 
                }}
                 color='success' variant='contained'>Add to cart</Button> */}
                <Button color='success' variant='contained'>Order Now</Button>
              </Box>
            </Box>

          </Paper>
                
                ))
              } 
         
          </Grid>
  </div>
  )
}

export default SearchProduct