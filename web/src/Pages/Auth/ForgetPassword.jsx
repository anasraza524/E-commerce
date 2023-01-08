import { useState,useContext } from 'react';
import { GlobalContext } from '../../Context/Context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const theme = createTheme();

const ForgetPassword = () => {
    let { state, dispatch } = useContext(GlobalContext);
    const notify = () => toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });;
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const data = new FormData(e.currentTarget);
    //   console.log({
    //     email: data.get('email'),
       
    //   });
    // };
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const forgetPassword =async (e) => { 
     
        e.preventDefault();
        const data = new FormData(e.currentTarget);
    try{ const res = await axios.post(`${state.baseUrl}/forget_password`, { 
      
      email: data.get('email')
     }, {
      withCredentials: true
  });
    
    if (res) {
      alert("email Sent");
    }
          if(res.status === 200) {
        
        navigate("/OtpRecord");
      }}
    catch(err){
      notify()
      setError(err.response.data.message)
console.log("foegetPassowrd Error",err)
    }
       
    
     }
  return (
    <ThemeProvider theme={theme}>
              <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
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
        <Box component="form" onSubmit={forgetPassword}  noValidate sx={{ mt: 1 }}>
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