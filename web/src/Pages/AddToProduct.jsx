import React from 'react'
import {
  Divider,Paper,Box,Button,Grid,CardMedia,Typography
} from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from "react"
import CancelIcon from '@mui/icons-material/Cancel';
let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:3000`;
}
const AddToProduct = ({BageNo,setBageNo}) => {
  
  const [addtoCartData, setaddtoCartData] = useState(null)
  const [loadProduct, setLoadProduct] = useState(false)
  useEffect(() => {
    
    (async () => {
      const response =
        await axios.get(`${baseUrl}/addtocarts`);
      setaddtoCartData(response.data.data);
      console.log("addtocart", response.data.data)
      setBageNo(response.data.data.length)
    })();
  }, [loadProduct]);



  const deleteCartProduct = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/addtocart/${id}`)
      console.log("response: ", response.data);
      setBageNo(BageNo-1)
      setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  // const addBageNo = async () => {
  //   let bage = addtoCartData.length
  
  //   try {
  //     const response = await
  //     axios.post(`${baseUrl}/bageno`,{bage} );
  
  //  console.log("ss",response)
  // // setBageNo(response)
  //   setLoadProduct(!loadProduct)

  //   } catch (error) {
  //     console.log("error cart in getting all products", error);
  //   }
  // }
 
  return (
    <div><Grid sx={{m:{xs:1,sm:2,lg:3}}} container item spacing={6}>
    {(!addtoCartData) ? null :
   addtoCartData?.map((eachProduct, index) => ( 
     <Paper
     
     key={index}
       elevation={4}
       sx={{ m: 3, width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>

       <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        
         
       <CancelIcon

onClick={() => {
  deleteCartProduct(eachProduct.id)
}}
     
       sx={{m:1,float:"right"}}/>
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
           {/* <Button
           //  onClick={AddTheProduct}
           onClick={() => {
             getAProduct(eachProduct.id)
           }}
            color='success' variant='contained'>Add to cart</Button> */}
           <Button fullWidth color='success' variant='contained'>Order Now</Button>
         </Box>
       </Box>

     </Paper>
           
           ))
         } 
    
     </Grid></div>
  )
}

export default AddToProduct;