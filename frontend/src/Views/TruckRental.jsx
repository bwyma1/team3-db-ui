import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { getAvailableTrucks } from "../API/Api";


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
            marginTop: 8,
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
          <Box sx={{
            width: "100%", borderTop: "2px solid", borderColor: "gray", borderRadius: "0px",
            marginBottom: "3rem", backgroundColor: "rgba(211, 211, 211, 0.2)"
          }}>
            {trucks.map((truck) => (
              <Box
                key={truck.truck_id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <img src={truck.truck_image} alt={truck.model} width="400" />
                </Box>
                <Box>
                  <Typography component="h2" variant="h6" fontWeight="bold">
                    {truck.model} ({truck.year}) ${truck.price}/day
                  </Typography>
                  <Typography component="p" variant="body1">
                    Mileage: {truck.mileage}
                  </Typography>
                  <Typography component="p" variant="body1">
                    Max Miles: {truck.max_miles}
                  </Typography>
                  <Typography component="p" variant="body1">
                    Owner ID: {truck.owner_id}
                  </Typography>
                  <Typography component="p" variant="subtitle1" fontWeight="bold">
                    Long-Term Discount Days: {truck.long_discount_days} days
                  </Typography>
                  <Typography component="p" variant="subtitle1" fontWeight="bold">
                    Long-Term Percent Discount: {truck.long_discount_percent * 100}%
                  </Typography>
                  <Typography component="p" variant="subtitle1" fontWeight="bold">
                    Flat Discount: {truck.long_discount_flat * 100}%
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleSelectTruck(truck)}
                    sx={{ mt: 2, mr: 2 }}
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TruckRental;

