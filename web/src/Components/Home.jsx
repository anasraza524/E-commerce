import React from 'react'
import axios from 'axios';
import { useState,useEffect } from "react"
import {Typography,Card,CardContent,
    TextField,Button,Paper} from '@mui/material'
    let baseUrl = ``;
    if (window.location.href.split(":")[0] === "http") {
        baseUrl = `http://localhost:3000`;
    }
    const Home = () => {

        const [ProductData, setProductData] = useState(null)
    const [prodName, setProdName] = useState('')
    const [prodPrice, setProdPrice] = useState('')
    const [prodDec, setProdDec] = useState('')
    useEffect(() => {
        (async () => {
          const response =
           await axios.get(`${baseUrl}/product`);
          setProductData(response.data.data);
          console.log(response.data.data)
        })();
      }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        let data = {
            name:prodName,
            price:prodPrice,
            dec:prodDec}
       
            const res = await axios({    // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
              method: "post",
              url: `${baseUrl}/product`,
              data: data,
              headers: { "Content-Type": "applicatio.json" },
              // withCredentials: true
            });
    
            console.log(`upload Success` + res.data);  // '{"answer":42}'
        // res.data.headers['Content-Type']; 
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
                sx={{pl:5,pr:5}}
                 size="small"
                type="text" placeholder="enter your Product name" required
                onChange={(e) => { setProdName(e.target.value) }}>
  </TextField>


                <TextField 
                sx={{pl:5,pr:5}}
                 size="small"
                type="text" placeholder="enter your Product Price" required
                onChange={(e) => { setProdPrice(e.target.value) }}>

                </TextField>
                <TextField 
                sx={{pl:5,pr:5}}
                 size="small"
                type="text" placeholder="enter your product Dexription" 
                onChange={(e) => { setProdDec(e.target.value) }}>

                </TextField>

                {/* <TextField 
                sx={{pl:5,pr:5}}
                 size="small"
                type="file"  
                onChange={(e) => { setCityName(e.target.value) }}>

                </TextField> */}
                <Button type="submit" variant="outlined">get </Button>
    </form></div>
  )
}

export default Home