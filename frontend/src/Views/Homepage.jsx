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
          <Typography component="h1" variant="h1" sx={{ textAlign: "center" }}>
            Welcome to Truck Bros. Rental!
          </Typography>
          <Typography component="p" variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
            Your one-stop online website for renting trucks of various makes, models, and sizes. Choose from our wide range of trucks and enjoy a seamless rental experience.
          </Typography>
          <Typography component="p" variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
            Interested in listing a truck? Create an account and list your truck(s) individually or in a bundle today!
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography component="h3" variant="h3" fontWeight="bold">
                Why choose us?
              </Typography>
              <Typography component="p" variant="body1" sx={{ mt: 1, fontSize: "1.5rem" }}>
                - Wide range of truck models and sizes
              </Typography>
              <Typography component="p" variant="body1" sx={{ fontSize: "1.5rem" }}>
                - Competitive pricing and discounts
              </Typography>
              <Typography component="p" variant="body" sx={{ fontSize: "1.5rem" }}>
                - Convenient locations and availability
              </Typography>
              <Typography component="p" variant="body1" sx={{ fontSize: "1.5rem" }}>
                - Secure and hassle-free rental process
              </Typography>
            </Grid>
            {context.currUser == null ? (
              <Grid item xs={8} md={2}>
                <Button
                  variant="contained"
                  onClick={() => handleNavigate('/signup')}
                  sx={{ mt: 2, backgroundColor: '#1976d2', borderColor: '#1976d2', color: '#fff', width: '20rem', mb: 2 }}
                >
                  Create an Account Right Now!
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleNavigate('/login')}
                  sx={{ mt: 2, backgroundColor: '#1976d2', borderColor: '#1976d2', color: '#fff', width: '20rem' }}
                >
                  Already Have an Account with us?
                  Log in!
                </Button>
              </Grid>
            ) : (
              <Grid item xs={8} md={2}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/8f/2011_Ram_Pickup_--_2011_DC.jpg"
                  alt="Truck"
                  style={{ maxWidth: '32rem', maxHeight: 'auto', borderRadius: '3rem'}}
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}





