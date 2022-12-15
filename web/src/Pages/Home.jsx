import React from 'react'
import SlideShow from '../Components/SlideShow';
import { Link } from "react-router-dom";
import {
  Divider,Paper,Box,Button,Grid,CardMedia,Typography
} from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from "react"

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:3000";
} else {
  baseUrl = "https://wild-pink-bat-tam.cyclic.app/";
}

const Home = ({AddTheProduct}) => {
  const [CurrentProduct, setCurrentProduct] = useState(null)
  const [homeProductData, setHomeProductData] = useState(null)
  const [loadProduct, setLoadProduct] = useState(false)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  
//   useEffect(() => {
    
//     (async () => {
//       const response =
//         await axios.get(`${baseUrl}/products`);
//       setProductData(response.data.data);
//       console.log("data", response.data.data)
// if(response.data.data.length === 0){
//   handleClickOpen()
// }else{
//   handleClose()
// }
//    })()
//   }, [loadProduct]);

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    console.log("response: ", response.data.data);

    setHomeProductData(response.data.data);
    if(response.data.data.length === 0){
         handleClickOpen()
       }else{
         handleClose()
      }
  } catch (error) {
    console.log("error in getting all products", error);
  }
}

useEffect(() => {

  getAllProducts()

}, [loadProduct])

  const getAProduct = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/product/${id}`)
      console.log("response: ", response.data);
console.log("response2: ", response.data.data)
      setCurrentProduct(response.data.data)
      console.log("CurrentProduct",CurrentProduct)
      let cart = {
        id:response.data.data._id,
        name:response.data.data.name,
        price:response.data.data.price,
        description:response.data.data.description,
        productImage:response.data.data.productImage
      }


      
      addcart(cart)
      if(!addcart.error)
      {
        
        AddTheProduct();
      }
      } 
      
      catch (error) {
      console.log("error cart in getting all products", error);
    }
  }


  const addcart = async (objectCart) => {
    try {
      const response = await
      axios.post(`${baseUrl}/addtocart`, objectCart);
  
   console.log(response)
  
    setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error cart in getting all products", error);
    }
  }


  return (
    <div>

      <SlideShow/>
      <Divider/>
    
      <div>
       


      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <DialogTitle dividers >
        <Typography variant='h4'>
          Welcome to E-Mart
          <CloseIcon onClick={handleClose} sx={{m:1,float:"right"}} />
        </Typography>
     
      </DialogTitle>
        <DialogContent dividers>

          <Typography variant='h6' gutterBottom>
            There is no product please add product first..... 
          </Typography>
          <Typography variant='h6'>
            Thank you...
          </Typography>
     
          <ShoppingCartIcon sx={{fontSize:"120px", float:"center",color:"green",ml:15}}/>
        </DialogContent>
        <DialogActions>
          <Link 
          sx={{fontSize:"20px" , textDecoration:"none"}}
          to="/MakeProduct">
          <Button sx={{fontSize:"20px"}} autoFocus onClick={handleClose}>
            Ok
          </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    </div>
      <Paper sx={{m:1}} elevation={1}>
   
       
         <Grid sx={{m:{xs:1,sm:5,lg:3}}} container item spacing={6}>
         {(!homeProductData) ? null :
        homeProductData?.map((eachProduct, index) => ( 
          <Paper
          
          key={index}
            elevation={4}
            sx={{ m: 3, width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
             
              
              
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
                <Button
                //  onClick={AddTheProduct}
                onClick={() => {
                  getAProduct(eachProduct._id)
                 
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