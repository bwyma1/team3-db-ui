import { AppContext } from "../Context/AppContext";
import React, { useContext } from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 2, backgroundColor: '#fff' }}>
          <Typography component="h1" variant="h2">
            Welcome to Truck Bros.
          </Typography>
          <Typography component="p" variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
            Your one-stop online website for renting trucks of various makes, models, and sizes. Choose from our wide range of trucks and enjoy a seamless rental experience.
          </Typography>
          <Typography component="p" variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
            Interested in listing a truck? Create an account and list your truck(s) individually or in a bundle today!
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography component="h3" variant="h5" fontWeight="bold">
                Why choose us?
              </Typography>
              <Typography component="p" variant="body1" sx={{ mt: 1 }}>
                - Wide range of truck models and sizes
              </Typography>
              <Typography component="p" variant="body1">
                - Competitive pricing and discounts
              </Typography>
              <Typography component="p" variant="body1">
                - Convenient locations and availability
              </Typography>
              <Typography component="p" variant="body1">
                - Secure and hassle-free rental process
              </Typography>
            </Grid>
            {context.currUser == null ? (
              <Grid item xs={10} md={2}>
                <Button
                  variant="contained"
                  onClick={() => handleNavigate('/signup')}
                  sx={{ mt: 2, backgroundColor: '1976d2', borderColor: '#1976d2', color: '#fff' }}
                >
                  Create an Account Right Now!
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleNavigate('/login')}
                  sx={{ mt: 2, backgroundColor: '#1976d2', borderColor: '#1976d2', color: '#fff' }}
                >
                  Already Have an Account with us?
                  Log in!
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}





