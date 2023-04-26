import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TruckAmenities from "./TruckAmenities";
import {
  updateTruckAvailability,
  getReviewsByTruckId,
  addReview,
  getTruckCities,
  addToUserRentedTrucks,
} from "../API/Api";
import ReviewForm from "./reviewForm";
import ReviewList from "./reviewList";



const TruckRentalDetails = () => {

  const getNextTwelveDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 1; i <= 12; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay.toISOString().split("T")[0]);
    }

    return days;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const selectedTruck = location.state.truck;
  const [truckReviews, setTruckReviews] = useState([]);
  const [truckCities, setTruckCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [user, setUser] = useState({});
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const availableDates = getNextTwelveDays();

  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")));
    setSelectedEndDate(availableDates[0]);
  }, []);

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchTruckReviews = async () => {
      const reviews = await getReviewsByTruckId(selectedTruck.truck_id);
      setTruckReviews(reviews);
    }
    fetchTruckReviews();
  }, [selectedTruck.truck_id]);


  useEffect(() => {
    const fetchTruckCities = async () => {
      const cities = await getTruckCities(selectedTruck.truck_id);
      setTruckCities(cities);
      if (cities.length > 0) setSelectedCity(cities[0].name);
    };
    fetchTruckCities();
  }, [selectedTruck.truck_id]);


  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };


  const handleReviewAdded = async (review) => {
    try {
      const createdReview = await addReview(selectedTruck.owner_id, selectedTruck.truck_id, review.userName, review.rating, review.comment);
      setTruckReviews([...truckReviews, createdReview]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };


  const handleRentTruck = async () => {
    try {
      await updateTruckAvailability(selectedTruck.truck_id, false);
      const today = new Date().toISOString().split("T")[0];
      await addToUserRentedTrucks(user.user_id, selectedTruck.truck_id, today, selectedEndDate, selectedCity);
      navigate("/currentrentals", { state: { availableDates, truckCities } });
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
        textAlign: "center", color: "black", padding: "2rem", width: "100%", backgroundColor: "rgba(211, 211, 211, 0.2)"
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
            p: 3,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <img src={selectedTruck.truck_image} alt={selectedTruck.model} width="700" />
          </Box>
          <Box>
            <Typography component="h2" variant="h6" fontWeight="bold" mb={1}>
              {selectedTruck.make} {selectedTruck.model} ({selectedTruck.year}) Price: ${selectedTruck.price}/day
            </Typography>
            <Typography component="p" variant="h5" mb={1}>
              Mileage: {selectedTruck.mileage}
            </Typography>
            <Typography component="p" variant="h5" mb={1}>
              Max Miles: {selectedTruck.max_miles}
            </Typography>
            <Typography component="p" variant="h5" mb={1}>
              Truck Capacity: {selectedTruck.truck_capacity} seats
            </Typography>
            <Typography component="p" variant="h5" mb={1}>
              Owner ID: {selectedTruck.owner_id}
            </Typography>
            <Typography component="p" variant="h8" fontWeight="bold" mb={1}>
              Long-Term Discount Days: {selectedTruck.long_discount_days} days
            </Typography>
            <Typography component="p" variant="h8" fontWeight="bold" mb={1}>
              Long-Term Percent Discount: {selectedTruck.long_discount_percent}%
            </Typography>
            <Typography component="p" variant="h8" fontWeight="bold" mb={1}>
              Flat Discount: ${selectedTruck.long_discount_flat} off per day pricing
            </Typography>
            <div>
              <TruckAmenities truck_id={selectedTruck.truck_id} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: 4,
                }}
              >
                <Typography component="p" variant="subtitle1" fontWeight="bold">
                  Location:
                </Typography>
                <Select value={selectedCity} onChange={handleCityChange} sx={{ marginTop: 1 }}>
                  {truckCities.map((city, index) => (
                    <MenuItem key={city.city_id + '-' + index} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}

                </Select>
                <Typography component="p" variant="subtitle1" fontWeight="bold" mt={2}>
                  End Date:
                </Typography>
                <Select value={selectedEndDate} onChange={handleEndDateChange} sx={{ marginTop: 1 }}>
                  {availableDates.map((date, index) => (
                    <MenuItem key={'date-' + date + '-' + index} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Button variant="contained" onClick={handleRentTruck} sx={{ mt: 2, mr: 2 }}>
                Rent this truck
              </Button>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/truckrental")}>
                Back to Truck Rental
              </Button>
            </div>
          </Box>
        </Box>
        <Box sx={{ p: 10 }}>
          <ReviewList reviews={truckReviews} />
          <ReviewForm userId={selectedTruck.owner_id} truckId={selectedTruck.truck_id} onReviewAdded={handleReviewAdded} />
        </Box>
      </Box>
    </Box>
  );
};

export default TruckRentalDetails;



