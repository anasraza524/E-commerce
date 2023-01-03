import React from 'react'
import {Button,Typography,CardMedia,Box} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Link } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import shop from '../assets/ecom-cart.gif'
import CloseIcon from '@mui/icons-material/Close';
import './DialogBox.css'
const DialogBox = ({DialogContentText,DialogDec}) => {
    const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const DialogOpen = () => {
    setOpen(true);
  };

  const DialogClose = () => {
    setOpen(false);
  };

  return (
    <div>  <Button variant="outlined" onClick={DialogOpen}>
        Open responsive dialog
      </Button>
      <Dialog
      autoHideDuration={3000}
     sx={{p:5}}
        fullScreen={fullScreen}
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
      <DialogContent sx={{display:'flex',flexDirection:"column",alignItems:"center"}}  dividers>


<div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
<Box sx={{m:{lg:4,sm:3,xs:1}}}>
<Typography sx={{fontSize:{xs:"30px",lg:'30px',sm:'30px'},mt:5}} variant='h3' gutterBottom>
  {DialogContentText}
</Typography>
<Typography sx={{fontSize:{xs:"16px"}}} variant='p' gutterBottom>
  {DialogDec}
</Typography>
</Box>
{/* <CardMedia
    component="img"
    loading="lazy"
    width="150"
      sx={{height:{xs:100,sm:200,lg:250},mt:1}}
    image={CardImage}
    alt="No product Image"
  /> */}

{/* <ShoppingCartIcon sx={{fontSize:"120px", float:"center",color:"green",ml:15}}/> */}
</DialogContent>
<DialogActions>
          <Link 
          sx={{fontSize:"20px" , textDecoration:"none"}}
          to="/Login">
          <Button sx={{fontSize:"20px"}} autoFocus onClick={DialogClose}>
            Ok
          </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogBox