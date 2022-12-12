import { Mail,DragHandle,
    Notifications, Pets, 
    ModeNight,Home,Article,
    AccountBox,Settings,Group,ShoppingCart,
    Person,Storefront,Logout,LocalMall
   } from "@mui/icons-material";
   import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
   import LogoutIcon from '@mui/icons-material/Logout';
   import {
   AppBar,
   Avatar,
   Badge,
   Box,
   InputBase,
   Menu,
   MenuItem,
   styled,
   Toolbar,
   Typography,Switch,
 Drawer,IconButton,Bag,
 Button,
 List,Tab,Tabs,
 ListItem,
 ListItemButton,
 Divider,ListItemIcon,ListItemText
 } from "@mui/material"

//  

 import { Link } from "react-router-dom";

 import { useState } from "react";
 import * as React from 'react';
 import axios from 'axios';
 import { useEffect } from "react"


 const StyledToolbar = styled(Toolbar)({
   display: "flex",
   backgroundColor:"skyblue",
   justifyContent: "space-between",
   // [Toolbar.breakpoints.up("sm")]: {
   //     justifyContent: "center",
   //   },
 });

 const LinkPage = styled(Link)({
   textDecoration:'none',
   color:' black',
   
   
  });
 const TabPage = styled(Tab)({
  fontWeight:'bolder',
  fontSize:'16px',
  color:'#FFFFFF',
  
 });
 const Search = styled("div")(({ theme }) => ({
   backgroundColor: "white",
   padding: "0 12px",
   borderRadius: theme.shape.borderRadius,
   width: "15%",
 }));
 
 const Icons = styled(Box)(({ theme }) => ({
   display: "none",
   alignItems: "center",
   gap: "20px",
   [theme.breakpoints.up("sm")]: {
     display: "flex",
   },
 }));

 const UserBox = styled(Box)(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   gap: "10px",
   [theme.breakpoints.up("sm")]: {
     display: "none",
   },
 }));
 


let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:3000`;
}

 const Nav = ({mode,setMode,BageNo,setBageNo}) => {
   const [open, setOpen] = useState(false);
   const [isOpen, setIsOpen] = React.useState(false)
   const toggleDrawer = () => {
       // setIsOpen((prevState) => !prevState)
       setIsOpen(true)
   }
//    const [isOpen, setIsOpen] = React.useState(false)

const [loadProduct, setLoadProduct] = useState(false)
// useEffect(() => {
  
//   (async () => {
//     const response =
//       await axios.get(`${baseUrl}/bageno`);
 
//     console.log("data", response.data.data)
   

//   })();
// }, [loadProduct]);


   return (
     <AppBar position="sticky">

       <StyledToolbar>
       <Button variant="contained" sx={{display:{lg:'none',sm:'none'}}} onClick={toggleDrawer}><DragHandle/></Button>
           <Drawer
               open={isOpen}
               onClose={()=>{
                   setIsOpen(false)
               }}
               direction='left'
               
           >
               <Box sx={{ width:250,textAlign:'center' }}>
               <List>
                 <LinkPage
                  onClick={()=>{setIsOpen(false)}}
                 to="/">
         <ListItem
         disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
               <Home /> 
             </ListItemIcon>
             <ListItemText primary="Home" />
           </ListItemButton>
         </ListItem></LinkPage>
         <LinkPage
          onClick={()=>{setIsOpen(false)}}
           to="/MakeProduct">
         <ListItem disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
              <Article /> 
             </ListItemIcon>
             <ListItemText primary="Add Product" />
           </ListItemButton>
         </ListItem></LinkPage> 
          <LinkPage
           onClick={()=>{setIsOpen(false)}}
          to="/SearchProduct">
         <ListItem disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
              <Group />
             </ListItemIcon>
             <ListItemText primary="Search Product" />
           </ListItemButton>
         </ListItem></LinkPage> 
         
         <Divider/>
         <ListItem disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
                <Logout/>
             </ListItemIcon>
             <ListItemText primary="Logout" />
           </ListItemButton>
         </ListItem>
        
       </List></Box>
           </Drawer>

       <Box sx={{justifyContent:{xs:'center',sm: "left",lg:'left'},
   alignItems:{xs:"center"}
   }}>
       <LocalMall sx={{ display: { xs: "none", sm: "block",lg:'block' } }} /> 
         <Typography  variant="h6"
          sx={{ 
          display: { xs: "" } }}>
           E-MART
         </Typography>
       </Box>
         {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
         {/* <Search>
           <InputBase placeholder="search..." />
         </Search> */}
         <Box sx={{ fontWeight:'20px', display:{xs:'none',lg:'block',sm:"block"} }}>
        
         
         {/* // value={value} onChange={handleChange} 
         centered */}
         




<LinkPage
 
   to="/" ><TabPage label="Home" /></LinkPage>
<LinkPage
  
   to="/MakeProduct" ><TabPage label="Add Product" /></LinkPage>
<LinkPage

 to="/SearchProduct" ><TabPage label="Search Product" /></LinkPage>
{/* <LinkPage  to="/MarkAttend" ><TabPage label="Search Product" /></LinkPage>
<LinkPage  to="/History" ><TabPage label="History" /></LinkPage> */}
{/* <TabPage component="a" to="/" label="Home"><Link  to="/">Home</Link></TabPage>
<TabPage component="a" to="About" label="About"><Link to="About">About</Link></TabPage> */}





   </Box>
  <Link sx={{
    textDecoration:'none',
    color:'white'
  }} to="/AddToProduct"> 


  <IconButton  aria-label="cart">
         
         <Badge badgeContent={BageNo} color="primary">
      
      <ShoppingCart style={{color:"whitesmoke"}} />
    </Badge>
</IconButton></Link>
         <Icons>
           
         <LogoutIcon
        //   onClick={logout}
          />
           <Avatar
             sx={{ width: 30, height: 30 }}
            
             onClick={(e) => setOpen(true)}
           />
         </Icons>
         {/* <UserBox onClick={(e) => setOpen(true)}>
           <Avatar
             sx={{ width: 30, height: 30 }}
             src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
           />
           <Typography variant="span">John</Typography>
         </UserBox> */}
       </StyledToolbar>
         
     </AppBar>
   );
 };
 
 export default Nav;


 