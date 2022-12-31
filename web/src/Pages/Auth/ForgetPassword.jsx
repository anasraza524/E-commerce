import React from 'react'
import { useState,useContext } from 'react';
import { GlobalContext } from '../../Context/Context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
const theme = createTheme();
const ForgetPassword = () => {
    let { state, dispatch } = useContext(GlobalContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log({
        email: data.get('email'),
       
      });
    };
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Forgot password
        </Typography><br />
        <Typography component="p" variant="p">
        Type Your Email Here </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Send Email
          </Button>
      
        </Box>
      </Box>
   
    </Container>
  </ThemeProvider>
  )
}

export default ForgetPassword