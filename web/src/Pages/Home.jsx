import React from 'react'
import SlideShow from '../Components/SlideShow';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
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
import noProductFound from '../assets/product-not-found.png'
import shop from '../assets/ecom-cart.gif'
import Cart from '../assets/runingCart.gif'
import Error from '../assets/404.gif'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
} 
const Home = ({BageNo,setBageNo}) => {
  const [CurrentProduct, setCurrentProduct] = useState(null)
  const [homeProductData, setHomeProductData] = useState(null)
  const [loadProduct, setLoadProduct] = useState(false)
  const [open, setOpen] = useState(false);
 const [bodyError, setBodyError] = useState({
  message:"",
      statusText: "",
      status:  ""
 })
const [homeProductDataLength, sethomeProductDataLength] = useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openError, setOpenError] = useState(false);
  const ClickOpenError = () => {
    setOpenError(true);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnak, setOpenSnak] = useState(false);
  const handleClickMsg = () => {
    setOpenSnak(true);
  };

  const handleCloseMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnak(false);
  };
  useEffect(() => {
    
    (async () => {
      const response =
        await axios.get(`${baseUrl}/addtocarts`);
      
      console.log("addtocart", response.data.data)
    setBageNo(response.data.data.length)
   
    })();
  }, [loadProduct]); 


const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    console.log("response: ", response.data.data);

    setHomeProductData(response.data.data);
    sethomeProductDataLength(response.data.data.length)
    
    if(response.data.data.length === 0){
         handleClickOpen()
       }else{
         handleClose()
      }
  } catch (error) {
    if(error){
      ClickOpenError()
    }else{
    handleCloseError()
   }
     setBodyError({
      message:error.message,
      statusText: error.response.statusText,
      status:  error.response.status
    }
        )
    console.log("error in getting all products", error);
  }
}

useEffect(() => {

  getAllProducts()

}, [loadProduct])

  const getAProduct = async (id) => {
    if(error || success){
      handleClickMsg()
    }
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

      } 
      
      catch (error) {
      console.log("error cart in getting all products", error);
    }
  }


  const addcart = async (objectCart) => {
    if(error || success){
      handleClickMsg()
    }
    try {
      const response = await
      axios.post(`${baseUrl}/addtocart`, objectCart);
  
   console.log("asds",response)
   setSuccess(response.data.message
    )
    setLoadProduct(!loadProduct)

    } catch (error) {
      setError(error.message)
      console.log("error cart in getting all products", error);
    
    }
  }


  return (
    <div>

      <SlideShow/>
      <Divider/>
      <Stack spacing={2} sx={{ width: '100%', }}>
      
      
    
      <Snackbar open={openSnak} autoHideDuration={2000} onClose={handleCloseMsg}>
       {(error)?<Alert onClose={handleCloseMsg} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>:
        <Alert severity="success">{success}</Alert>
        }
        
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
    
    <div>
      <BootstrapDialog
        onClose={handleCloseError}
        aria-labelledby="customized-dialog-title"
        open={openError}
        
       
      >
      <DialogTitle dividers >
        <Typography sx={{fontSize:{xs:"26px"}}} variant='h4'>
        E-Mart Error
          <CloseIcon onClick={handleCloseError} sx={{m:1,float:"right"}} />
        </Typography>
     
      </DialogTitle>
        <DialogContent  dividers>

         
          <CardMedia
              component="img"
              loading="lazy"
                sx={{
                  height:{xs:180,sm:350,lg:400}
              ,width:{xs:250,sm:520,lg:580}
              }}
              image={Error}
              alt="No product Image"
            />
        
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>
    </div>




      <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <DialogTitle dividers >
        <Typography sx={{fontSize:{xs:"26px"}}} variant='h4'>
          Welcome to E-Mart
          <CloseIcon onClick={handleClose} sx={{m:1,float:"right"}} />
        </Typography>
     
      </DialogTitle>
        <DialogContent  dividers>

          <Typography sx={{fontSize:{xs:"16px"}}} variant='h6' gutterBottom>
            There is no product please add product first..... 
          </Typography>
          <Typography sx={{fontSize:{xs:"16px"}}} variant='h6'>
            Thank you...
          </Typography>
          <CardMedia
              component="img"
              loading="lazy"
              width="150"
                sx={{height:{xs:100,sm:200,lg:250},mt:1}}
              image={shop}
              alt="No product Image"
            />
          {/* <ShoppingCartIcon sx={{fontSize:"120px", float:"center",color:"green",ml:15}}/> */}
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
     
     
     
      
   
{(!homeProductData || homeProductDataLength === 0)?
      <CardMedia
              component="img"
              width="200"
              loading="lazy"
                sx={{height:{xs:"600",sm:"800",lg:"850"}}}
              image={Cart}
              alt="No product Image"
            />:
       
         <Grid sx={{height:"100%" ,m:{xs:1,sm:2,lg:3}}} container item spacing={6}>
         {(!homeProductData) ? null :
        homeProductData?.map((eachProduct, index) => ( 
         
          <Paper
          
          key={index}
            elevation={4}
            sx={{ m:{xs:2,lg:2,sm:1},mb:"5px",  width: '100%', maxWidth:{ lg:300,xs:320,sm:300}, bgcolor: 'background.paper' }}>

            <Box sx={{ width: '100%', maxWidth:{ lg:300,xs:320,sm:300}, bgcolor: 'background.paper' }}>
             
              
              
               <CardMedia
                component="img"
                width="250"
                loading="lazy"
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
                <Divider/>
              </Box>
              
            </Box>
            
          </Paper>
          
              
                ))
              } 

         
         
          </Grid>
          

            }


     
    </div>
  )
}

export default Home;