import React,{ useState,useContext } from 'react';
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
import { Link } from "react-router-dom";
import {DialogContent,Dialog,DialogContentText,DialogTitle,DialogActions,CardMedia} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SendEmail from '../../assets/sending-emai.gif'
const theme = createTheme();

const ForgetPassword = () => {
  const [open, setOpen] = React.useState(false);
  const DialogOpen = () => {
  
    setOpen(true);
  };

  const DialogClose = () => {
    setOpen(false);
    navigate("/OtpRecord");
  };
    let { state, dispatch } = useContext(GlobalContext);
    const notify = (error,errorNetwork,errorCheck) => toast.error((errorCheck !== 401)?
error:errorNetwork
    
    , {
      position: "top-right",
      autoClose: 2000,
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
    
    // if (res) {
    //   alert("email Sent");
    // }
    DialogOpen()
      //     if(res.status === 200) {
        
      //   navigate("/OtpRecord");
      // }
}
    catch(err){
      notify(err.response.data.message , err.message,
        err.response.status
        )
      setError(err.response.data.message)
console.log("foegetPassowrd Error",err)
console.log("err.response.status",err.response.status)
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
<Dialog

open={open}
onClose={DialogClose}
aria-labelledby="responsive-dialog-title"
>
 <DialogTitle dividers="true" >
<Typography sx={{fontSize:{xs:"26px"},display:'flex',flexDirection:"column",alignItems:"center"}} variant='h4'>
  E-Mart
  {/* <CloseIcon onClick={DialogClose} sx={{m:1,float:"right"}} /> */}
</Typography>

</DialogTitle>
<DialogContent sx={{display:'flex',flexDirection:"column",alignItems:"center"}}  dividers="true">

<CardMedia
component="img"
loading="eager"
width="150"
sx={{height:{xs:100,sm:150,lg:200},mt:1}}
 image={SendEmail}
alt="No product Image"
/>

<Box sx={{m:{lg:2,sm:2,xs:1}}}>
<Typography sx={{fontSize:{xs:"30px",lg:'30px',sm:'30px'}}} variant='h3' gutterBottom>

Email has been sent 

</Typography>
<Typography sx={{fontSize:{xs:"16px"}}} variant='p' gutterBottom>

please visit your inbox and copy & past the given OTP <br />
Thank you,
</Typography>
</Box>

</DialogContent>
<DialogActions>

<Link 
sx={{fontSize:"20px" , textDecoration:"none"}}
to="/OtpRecord">
<Button sx={{fontSize:"20px"}} autoFocus onClick={DialogClose}>
Ok
</Button>
</Link>




 
</DialogActions>
</Dialog>
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
        <Typography component="p" variant="p">
          <Link  to="/"  >
                  lets Login
                </Link></Typography>
      </Box>
   
    </Container>
  </ThemeProvider>
  )
}

export default ForgetPassword