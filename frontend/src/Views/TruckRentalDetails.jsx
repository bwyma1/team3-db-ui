import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TruckAmenities from "./TruckAmenities";
import { updateTruckAvailability } from "../API/Api";


const TruckRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTruck = location.state.truck;

  const handleRentTruck = async () => {
    try {
      const response = await updateTruckAvailability(selectedTruck.truck_id, false);
      console.log(response);
      // Navigate back to the truck list page after successfully updating the truck availability
      navigate("/truckrental");
    } catch (err) {
      console.log(err);
    }
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
            <img src={selectedTruck.truck_image} alt={selectedTruck.model} width="200" />
          </Box>
          <Box>
            <Typography component="h2" variant="h6" fontWeight="bold">
              {selectedTruck.model} ({selectedTruck.year}) OwnerID: {selectedTruck.owner_id}
            </Typography>
            <Typography component="p" variant="body1">
              Mileage: {selectedTruck.mileage}
            </Typography>
            <Typography component="p" variant="body1">
              Max Miles: {selectedTruck.max_miles}
            </Typography>
            <Typography component="p" variant="subtitle1" fontWeight="bold">
              Long-Term Discount Days: {selectedTruck.long_discount_days} days
            </Typography>
            <Typography component="p" variant="subtitle1" fontWeight="bold">
              Long-Term Percent Discount: {selectedTruck.long_discount_percent}%
            </Typography>
            <Typography component="p" variant="subtitle1" fontWeight="bold">
              Flat Discount: {selectedTruck.long_discount_flat}
            </Typography>
            <TruckAmenities truck_id={selectedTruck.truck_id} />
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



