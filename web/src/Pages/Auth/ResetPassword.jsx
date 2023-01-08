
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
import {DialogContent,Dialog,DialogContentText,DialogTitle,DialogActions,CardMedia} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate } from "react-router-dom";
import DialogBox from '../../Components/DialogBox';
import Sucsess from '../../assets/Succes.gif'
import 'react-toastify/dist/ReactToastify.css';
import Error from '../../assets/error..gif'
import axios from 'axios';
const theme = createTheme();
const ResetPassword = () => {
  const [open, setOpen] = React.useState(false);
  const DialogOpen = () => {
    setOpen(true);
    navigate("/");
  };

  const DialogClose = () => {
    setOpen(false);
    navigate("/");
  };
  const { _id, token } = useParams();
  const navigate = useNavigate();
    let { state, dispatch } = useContext(GlobalContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log({
        email: data.get('email'),
       
      });
    };
    const ResetPassword = async (e) => {
      e.preventDefault();
    //   if(error || success){
    //     handleClickMsg()
    //   } 
    // console.log(state)
    setSuccess('')
    setError('')
      const data = new FormData(e.currentTarget);
      try{
      
      // const res = await axios.put(`/api/v1/forget_password/${_id}/${token}`,
      const response = await axios.post(`${state.baseUrl}/reset_password`,
       { password:data.get('password'),withCredentials:true },
      );
 
      setSuccess(response.data.message)
      DialogOpen()
      console.log(response);
        console.log(" your password has been change successfully");
        // setResult(response.data.message)
      e.target.reset()
      // if (res.status === 200) {
      //   alert("password changed Successfully");
      //   navigate("/");
      // }
    }catch(error) {
      setError(error.message)
  DialogOpen()
 setError(error.response.data.message)
        console.log("Reset error: ", error);

      }
    }

  return (
    <ThemeProvider theme={theme}>

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

{(!error)?
<CardMedia
component="img"
loading="eager"
width="150"
sx={{height:{xs:100,sm:150,lg:200},mt:1}}
image={Sucsess}
alt="No product Image"
/>
:
<CardMedia
component="img"
loading="eager"
width="150"
sx={{height:{xs:100,sm:150,lg:200}}}
image={Error}
alt="No product Image"
/>
}
<Box sx={{m:{lg:2,sm:2,xs:1}}}>
<Typography sx={{fontSize:{xs:"30px",lg:'30px',sm:'30px'}}} variant='h3' gutterBottom>
{(!error)?
" your password has been change successfully"

:
"Password Change Error"
}
</Typography>
<Typography sx={{fontSize:{xs:"16px"}}} variant='p' gutterBottom>
{(!error)?
"Have a nice day"

:
"Oops Error in Password Change"
}

</Typography>
</Box>

</DialogContent>
<DialogActions>
{(!error)?
<Link 
sx={{fontSize:"20px" , textDecoration:"none"}}
to="/Login">
<Button sx={{fontSize:"20px"}} autoFocus onClick={DialogClose}>
Ok
</Button>
</Link>
:

<Button sx={{fontSize:"20px"}} autoFocus onClick={DialogClose}>
Ok
</Button>

}

 
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
        New password
        </Typography><br />
        <Typography component="p" variant="p">
        Type Your New password Here </Typography>
        <Box component="form" onSubmit={ResetPassword}  noValidate sx={{ mt: 1 }}>
        <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Change Password
          </Button>
      
        </Box>
        <Typography component="p" variant="p">
          <Link  to="/"  >
                  Don`t want to change password
                </Link></Typography>
      </Box>
   
    </Container>
  </ThemeProvider>
  )
}

export default ResetPassword