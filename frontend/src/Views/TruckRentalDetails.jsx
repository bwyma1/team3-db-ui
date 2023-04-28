import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Container,
  Grid
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
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          sx={{
            textAlign: "center",
            color: "black",
            padding: "2rem",
            width: "100%",
            backgroundColor: "rgba(211, 211, 211, 0.5)",
          }}
        >
          Truck Rental Details
        </Typography>
        <Box
          sx={{
            width: "100%",
            borderTop: "1rem solid",
            borderColor: "white",
            borderRadius: "0rem",
            marginBottom: "3rem",
            backgroundColor: "rgba(211, 211, 211, 0.1)",
          }}
        >
          <Grid container spacing={2} sx={{ p: 3, borderBottom: "1px solid #ccc" }}>
            <Grid item xs={12} md={6}>
              <img
                src={selectedTruck.truck_image}
                alt={selectedTruck.model}
                style={{ width: "100%", height: "auto" }}
              />
              <Box>
                <Typography component="p" variant="h5" fontWeight="bold" mb={2}>
                  Truck Mileage: {selectedTruck.mileage}
                </Typography>
                <Typography component="p" variant="h5" fontWeight="bold" mb={2}>
                  Max Miles: {selectedTruck.max_miles}
                </Typography>
                <Typography component="p" variant="h5" fontWeight="bold" mb={2}>
                  Truck Capacity: {selectedTruck.truck_capacity} seats
                </Typography>
                <Typography component="p" variant="h5" fontWeight="bold" mb={2}>
                  Cargo Capacity: {selectedTruck.cargo_capacity} pounds
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography component="h4" variant="h4" fontWeight="bold" mt={"5rem"} textAlign={"center"}>
                  {selectedTruck.make} {selectedTruck.model} ({selectedTruck.year})
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      display: "block",
                      marginBottom: "3rem",
                      marginTop: "1rem",
                    }}
                  >
                    Price: ${selectedTruck.price}/day
                  </Box>
                </Typography>
                <Grid container spacing={10}>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography component="p" variant="h6" fontWeight="bold" mb={2}>
                        Minimum Days For Discount: {selectedTruck.long_discount_days}
                      </Typography>
                      <Typography component="p" variant="h6" fontWeight="bold" mb={2}>
                        Long-Term Percent Discount: {selectedTruck.long_discount_percent}%
                      </Typography>
                      <Typography component="p" variant="h6" fontWeight="bold" mb={4}>
                        Flat Discount: ${selectedTruck.long_discount_flat} off per day pricing
                      </Typography>
                      <TruckAmenities truck_id={selectedTruck.truck_id} />
                      </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography component="p" variant="h6" fontWeight="bold">
                      Pickup Location:
                    </Typography>
                    <Select value={selectedCity} onChange={handleCityChange} sx={{ marginTop: 1, width: "100%" }}>
                      {truckCities.map((city, index) => (
                        <MenuItem key={city.city_id + "-" + index} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography component="p" variant="h6" fontWeight="bold" mt={2}>
                      End Date:
                    </Typography>
                    <Select value={selectedEndDate} onChange={handleEndDateChange} sx={{ marginTop: 1, width: "100%" }}>
                      {availableDates.map((date, index) => (
                        <MenuItem key={"date-" + date + "-" + index} value={date}>
                          {date}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleRentTruck}
                  sx={{ mt: 3.5, mb: 2, mr: 2, minWidth: "2rem", minHeight: "1rem", fontSize: "1rem" }}
                >
                  Rent this truck
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 3.5, mb: 2, mr: 2, minWidth: "2rem", minHeight: "1rem", fontSize: "1rem" }}
                  onClick={() => navigate("/truckrental")}
                >
                  Back to Truck Rental
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ p: 3 }}>
          <ReviewList reviews={truckReviews} />
          <ReviewForm
            userId={selectedTruck.owner_id}
            truckId={selectedTruck.truck_id}
            onReviewAdded={handleReviewAdded}
          />
        </Box>
      </Box>
    </Box>
  </Container>
);
};

export default TruckRentalDetails;

  