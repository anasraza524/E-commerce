import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Muhammad Anas Raza
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '20vh',
      }}
    >
      <CssBaseline />
      {/* <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container> */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            For Contact.
          </Typography>
          <Copyright />
          <Box>
          <a href="https://www.facebook.com/profile.php?id=100016828268876" target="_blank"  class="fa fa-facebook"></a>
          <a href="https://www.linkedin.com/in/muhammad-anas-raza-siddiqui-963362214/" target="_blank"  class="fa fa-linkedin"></a>
          <a href="https://www.instagram.com/arsiddiqui26/" target="_blank"  class="fa fa-instagram"></a>
          <a href="https://github.com/anasraza524?tab=repositories" target="_blank"  class="fa fa-github"></a>
          <a href="mailto:anasattari48@gmail.com" target="_blank"  class="fa fa-google"></a>
         </Box>
        </Container>

      </Box>
    </Box>
  );
}