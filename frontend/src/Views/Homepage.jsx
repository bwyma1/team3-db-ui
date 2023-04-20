import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate.push(path);
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
        <Typography component="h1" variant="h2">
          Welcome to Truck Rental
        </Typography>
        <Typography component="p" variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          Your one-stop solution for renting trucks of various makes, models, and sizes. Choose from our wide range of trucks and enjoy seamless rental experience.
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
        </Grid>
      </Box>
    </Container>
  );
}

