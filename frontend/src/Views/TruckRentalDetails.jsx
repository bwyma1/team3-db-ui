import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const TruckRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTruck = location.state.truck;

  const handleRentTruck = () => {
    // add truck to user's rented trucks

    // navigate back to homepage
    navigate("/");
  };

  return (
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
        Truck Rental Details
      </Typography>
      <Box sx={{
        width: "100%", borderTop: "2px solid", borderColor: "gray", borderRadius: "0px",
        marginBottom: "3rem", backgroundColor: "rgba(211, 211, 211, 0.2)"
      }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <img src={selectedTruck.image} alt={selectedTruck.name} width="200" />
          </Box>
          <Box>
            <Typography component="h2" variant="h6" fontWeight="bold">
              Truck Name: {selectedTruck.name}
            </Typography>
            <Typography component="p" variant="body1">
              {selectedTruck.description}
            </Typography>
            <Typography component="p" variant="body2">
              Specifications: {selectedTruck.specifications}
            </Typography>
            <Typography component="p" variant="subtitle1" fontWeight="bold">
              Price: ${selectedTruck.price}
            </Typography>
            <Button variant="contained" onClick={handleRentTruck} sx={{ mt: 2, mr: 2 }}>
              Rent this truck
            </Button>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/truckrental")}>
              Back to Truck Rental
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TruckRentalDetails;



