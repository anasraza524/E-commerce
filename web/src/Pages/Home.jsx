import React from 'react'
import SlideShow from '../Components/SlideShow';
import {
  Divider,Paper,Box,Button,Grid,CardMedia,Typography
} from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from "react"

let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:3000`;
}

const Home = ({AddTheProduct}) => {
  const [CurrentProduct, setCurrentProduct] = useState(null)
  const [ProductData, setProductData] = useState(null)
  const [loadProduct, setLoadProduct] = useState(false)
  useEffect(() => {
    
    (async () => {
      const response =
        await axios.get(`${baseUrl}/products`);
      setProductData(response.data.data);
      console.log("data", response.data.data)
      let arr = [45,54,45,4]
console.log()
    })();
  }, [loadProduct]);



  const getAProduct = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/product/${id}`)
      console.log("response: ", response.data);
console.log("response2: ", response.data.data)
      setCurrentProduct(response.data.data)
      console.log("CurrentProduct",CurrentProduct)
      addcart()
      if(!addcart.error)
      {
        
        AddTheProduct();
      }
      } 
      
      catch (error) {
      console.log("error cart in getting all products", error);
    }
  }


  const addcart = async () => {
    try {
      const response = await
      axios.post(`${baseUrl}/addtocart`, CurrentProduct);
  
   
  
    setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error cart in getting all products", error);
    }
  }


  return (
    <div>

      <SlideShow/>
      <Divider/>
      <Paper sx={{m:1}} elevation={1}>
   
       
         <Grid sx={{m:{xs:1,sm:5,lg:3}}} container item spacing={6}>
         {(!ProductData) ? null :
        ProductData?.map((eachProduct, index) => ( 
          <Paper
          
          key={index}
            elevation={4}
            sx={{ m: 3, width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
             
              
              
               <CardMedia
                component="img"
                width="200"
                height="200"
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
                <Button
                //  onClick={AddTheProduct}
                onClick={() => {
                  getAProduct(eachProduct.id)
                 
                }}
                 color='success' variant='contained'>Add to cart</Button>
                <Button color='success' variant='contained'>Order Now</Button>
              </Box>
            </Box>

          </Paper>
                
                ))
              } 
         
          </Grid>
          

   
      </Paper>
    </div>
  )
}

export default Home;