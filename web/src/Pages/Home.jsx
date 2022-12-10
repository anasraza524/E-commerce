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

const Home = () => {
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
  return (
    <div>

      <SlideShow/>
      <Divider/>
      <Paper sx={{mt:2}} elevation={1}>
      <Row>
        <Col> {(!ProductData) ? null :
        ProductData?.map((eachProduct, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ m: 3, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
             
              
              
               <CardMedia
                component="img"
                width="300"
                height="300"
                image={eachProduct.productImage}
                alt="green iguana"
              />
              <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {eachProduct.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                      ${eachProduct.price}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                  {eachProduct.description}
                </Typography>
              </Box>
              <Divider variant="middle" />

              <Box sx={{
                display: "flex", justifyContent: "space-evenly",
                m: 1, p: 1
              }}>
                <Button color='success' variant='contained'>Add to cart</Button>
                <Button color='success' variant='contained'>Order Now</Button>
              </Box>
            </Box>

          </Paper>
        ))
      }</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
      </Paper>
    </div>
  )
}

export default Home;