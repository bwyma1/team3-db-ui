import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { getAvailableTrucks } from "../API/Api";
import { CardMedia } from "@mui/material";

const theme = createTheme();

const TruckRental = () => {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    const fetchAvailableTrucks = async () => {
      const truckData = await getAvailableTrucks();
      setTrucks(truckData);
    };
    fetchAvailableTrucks();
  }, []);

  const handleSelectTruck = (truck) => {
    setSelectedTruck(truck);
    navigate("/truckrentaldetails", { state: { truck } });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{
            textAlign: "center", color: "black", padding: "1rem", width: "100%", backgroundColor: "rgba(211, 211, 211, 0.2)"
          }}>
            Truck Rental Selection
          </Typography>
          {trucks.length === 0 ? (
            <Typography component="h2" variant="h5" sx={{ textAlign: "center", marginTop: 3 }}>
              No Trucks Currently Available!
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ marginTop: 1 }}>
              {trucks.map((truck) => (
                <Grid item key={truck.truck_id} xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={truck.truck_image}
                      alt={truck.model}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" gutterBottom>
                        {truck.make} {truck.model}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        ({truck.year})
                      </Typography>
                      <Button variant="contained" onClick={() => handleSelectTruck(truck)} color="primary" fullWidth 
                      sx={{ 
                        fontWeight: "bold", 
                        backgroundColor: "#C1292E",
                        "&:hover": {
                          backgroundColor: "#C1292E"
                        }
                          }}>
                        ${truck.price} / day
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TruckRental;



