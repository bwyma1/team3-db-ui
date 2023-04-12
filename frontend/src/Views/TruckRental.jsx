import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const theme = createTheme();


const trucks = [
  {
    id: 1,
    name: "Truck 1",
    image: "https://via.placeholder.com/150",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: "Specification 1, Specification 2, Specification 3",
  },
  {
    id: 2,
    name: "Truck 2",
    image: "https://via.placeholder.com/150",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: "Specification 1, Specification 2, Specification 3",
  },
  {
    id: 3,
    name: "Truck 3",
    image: "https://via.placeholder.com/150",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: "Specification 1, Specification 2, Specification 3",
  },
  {
    id: 4,
    name: "Truck 4",
    image: "https://via.placeholder.com/150",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: "Specification 1, Specification 2, Specification 3",
  },
  {
    id: 5,
    name: "Truck 5",
    image: "https://via.placeholder.com/150",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: "Specification 1, Specification 2, Specification 3",
  },
];


const TruckRental = () => {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const navigate = useNavigate();

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
            textAlign: "center", color: "black", padding: "1rem", width: "100%", backgroundColor: "rgba(211, 211, 211, 0.2)",
            border: "2px solid", borderColor: "gray", borderRadius: "0px"
          }}>
            Truck Rental Selection
          </Typography>
          <Box sx={{ width: "100%", border: "2px solid", borderColor: "gray", borderRadius: "0px",
            marginBottom: "2rem", backgroundColor: "rgba(211, 211, 211, 0.2)" }}>
            {trucks.map((truck) => (
              <Box
                key={truck.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <img src={truck.image} alt={truck.name} width="100" />
                </Box>
                <Box>
                  <Typography component="h2" variant="h6" fontWeight="bold">
                    {truck.name}
                  </Typography>
                  <Typography component="p" variant="body1">
                    {truck.description}
                  </Typography>
                  <Typography component="p" variant="body2">
                    Specifications: {truck.specifications}
                  </Typography>
                  <Typography component="p" variant="subtitle1" fontWeight="bold">
                    Price: ${truck.price}
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

