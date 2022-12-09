import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react"
import {
  Typography, Card, CardContent,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia
} from '@mui/material'
let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:3000`;
  console.log(baseUrl)
}
const Home = () => {

  const [prodImage, setProdImage] = useState('')
  const [ProductData, setProductData] = useState(null)
  const [prodName, setProdName] = useState('')
  const [prodPrice, setProdPrice] = useState('')
  const [prodDec, setProdDec] = useState('')
  useEffect(() => {
    (async () => {
      const response =
        await axios.get(`${baseUrl}/products`);
      setProductData(response.data.data);
      console.log("data", response.data.data)
    })();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    let data = {
      name: prodName,
      price: prodPrice,
      description: prodDec
    }

    const response = await
      axios.post(`${baseUrl}/product`, data);

    console.log(data)
    console.log(prodName, prodDec, prodPrice)
    console.log(response);
  }


  // .catch(err => {
  //     console.log("error: ", err);
  // })

  // console.log("I am click handler")
  // axios.get(`${baseUrl}/products`)
  //     .then(response => {
  //         console.log("response: ", response.data);

  //         setProductData(response.data);
  //     })
  //     .catch(err => {
  //         console.log("error: ", err);
  //     })

  return (



    <div>
      <form onSubmit={submitHandler}>
        <TextField
          sx={{ pl: 5, pr: 5 }}
          size="small"
          type="text" placeholder="enter your Product name" required
          onChange={(e) => { setProdName(e.target.value) }}>
        </TextField>

        <br /><br />
        <TextField
          sx={{ pl: 5, pr: 5 }}
          size="small"
          type="number" placeholder="enter your Product Price" required
          onChange={(e) => { setProdPrice(e.target.value) }}>

        </TextField>
        <br />
        <br />
        <TextField
          sx={{ pl: 5, pr: 5 }}
          size="small"
          type="text" placeholder="enter your product Dexription"
          onChange={(e) => { setProdDec(e.target.value) }}>

        </TextField>

        {/* <TextField 
                sx={{pl:5,pr:5}}
                 size="small"
                type="file"  
                onChange={(e) => { setprod(e.target.value) }}>

                </TextField>  */}
        <Button type="submit" variant="outlined">Add Product </Button>
      </form>
      <br />
      <br />
      <Divider />
      {(!ProductData) ? null :
        ProductData?.map((eachProduct, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ m: 3, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {(prodImage === "") ? null : <CardMedia
                component="img"
                width="200"
                height="200"
                image={eachProduct.ProductImage}
                alt="green iguana"
              />}
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
      }
    </div>
  )
}

export default Home