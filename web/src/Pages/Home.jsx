import React from 'react'
import SlideShow from '../Components/SlideShow';
import {
  Divider,Paper,Box,Button,Grid,CardMedia,Typography
} from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:3000`;
}

const Home = ({AddTheProduct}) => {
  const [ProductData, setProductData] = useState(null)
  const [loadProduct, setLoadProduct] = useState(false)
  useEffect(() => {
    
    (async () => {
      const response =
        await axios.get(`${baseUrl}/products`);
      setProductData(response.data.data);
      console.log("data", response.data.data)
    })();
  }, [loadProduct]);

  const ClickEvent = (e) => {
    console.log("data",e)
    console.log("ev",e.target.dataset.user)
  }

  // const getAProducts = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5001/products`)
  //     console.log("response: ", response.data);

  //     setProducts(response.data.data)

  //   } catch (error) {
  //     console.log("error in getting all products", error);
  //   }
  // }


  return (
    <div>

      <SlideShow/>
      <Divider/>
      <Paper sx={{m:1}} elevation={1}>
   
         {(!ProductData) ? null :
        ProductData?.map((eachProduct, index) => ( 
         <Grid sx={{m:{xs:1,sm:5,lg:3}}} container item spacing={6}>
          <Paper
          onClick={ClickEvent}
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
                 onClick={ClickEvent}
                 color='success' variant='contained'>Add to cart</Button>
                <Button color='success' variant='contained'>Order Now</Button>
              </Box>
            </Box>

          </Paper>
      
         
          </Grid>
          
          
       ))
      } 
   
      </Paper>
    </div>
  )
}

export default Home;