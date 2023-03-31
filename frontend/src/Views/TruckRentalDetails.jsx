import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { addUser } from "../API/Api";

const TruckRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTruck = location.state.truck;

  const handleRentTruck = () => {
    // add truck to user's rented trucks
    addUser(selectedTruck);

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
      <Typography component="h1" variant="h5">
        Truck Rental Details
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" variant="h6">
          Truck Name: {selectedTruck.name}
        </Typography>
        <Typography component="p" variant="body1">
          {selectedTruck.description}
        </Typography>
        <Typography component="p" variant="body2">
          Specifications: {selectedTruck.specifications}
        </Typography>
        <Button variant="contained" onClick={handleRentTruck} sx={{ mt: 2 }}>
          Rent this truck
        </Button>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/truckrental")}>
          Back to Truck Rental
        </Button>
      </Box>
    </Box>
  );
};

export default TruckRentalDetails;


