import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { getUserRentedTrucks, updateUserRentedTruck, getTruckCities } from "../API/Api";
import { useLocation } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from "@mui/material";


const RentedTrucks = () => {
  const [user, setUser] = useState({});
  const [rentedTrucks, setRentedTrucks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTruck, setEditingTruck] = useState(null);
  const location = useLocation();
  const [availableDates, setAvailableDates] = useState([]);
  const [truckCities, setTruckCities] = useState([]);

  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');

  useEffect(() => {
    if (availableDates.length > 0) {
      setUpdatedEndDate(availableDates[0]);
    }
  }, [availableDates]);

  useEffect(() => {
    if (truckCities.length > 0) {
      setUpdatedCity(truckCities[0].name);
    }
  }, [truckCities]);

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

  useEffect(() => {
    setAvailableDates(getNextTwelveDays());
  }, []);


  useEffect(() => {
    const fetchTruckCities = async () => {
      const cities = await getTruckCities(editingTruck.truck_id);
      setTruckCities(cities);
    };
    if (editingTruck) {
      fetchTruckCities();
    }
  }, [editingTruck]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSaveClick = async () => {
    try {
      await updateUserRentedTruck(editingTruck.truck_rent_id, updatedEndDate, updatedCity);
      setOpenDialog(false);
      const updatedRentedTrucks = rentedTrucks.map((truck) =>
        truck.truck_rent_id === editingTruck.truck_rent_id
          ? { ...truck, end_date: updatedEndDate, city: updatedCity }
          : truck
      );
      setRentedTrucks(updatedRentedTrucks);
    } catch (err) {
      console.error('Error updating rented truck:', err);
    }
  };

  const handleEditClick = (rentedTruck) => {
    setEditingTruck(rentedTruck);
    setUpdatedEndDate(rentedTruck.end_date);
    setUpdatedCity(rentedTruck.city);
    setOpenDialog(true);
  };


  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user && user.user_id) {
      const fetchRentedTrucks = async () => {
        const truckData = await getUserRentedTrucks(user.user_id);
        setRentedTrucks(truckData);
      };
      fetchRentedTrucks();
    }
  }, [user]);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ marginBottom: 4 }}>
        Your Rented Trucks
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gridGap: 4,
        }}
      >
        {rentedTrucks.map((rentedTruck) => (
          <Card key={rentedTruck.truck_id} sx={{ minWidth: "35rem", marginBottom: "2rem" }}>
            <CardMedia
              component="img"
              height="220rem"
              image={rentedTruck.truck_image}
              alt={rentedTruck.model}
            />
            <CardContent>
              <Typography component="h2" variant="h6" fontWeight="bold" mb={1}>
                {rentedTruck.make} {rentedTruck.model} ({rentedTruck.year})
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                Price: ${rentedTruck.price}/day
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                Location: {rentedTruck.selectedCity}
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                Start Date: {formatDate(rentedTruck.start_date)}
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                End Date: {formatDate(rentedTruck.end_date)}
              </Typography>
              <Button variant="contained" onClick={() => handleEditClick(rentedTruck)} sx={{ mt: 2, mr: 2 }}>
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Truck Rental Details</DialogTitle>
        <DialogContent>
          <Typography component="p" variant="subtitle1" fontWeight="bold">
            End Date:
          </Typography>
          <Select value={updatedEndDate} onChange={(e) => setUpdatedEndDate(e.target.value)} sx={{ marginTop: 1 }}>
            {availableDates.map((date, index) => (
              <MenuItem key={"date-" + date + "-" + index} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
          <Typography component="p" variant="subtitle1" fontWeight="bold" mt={2}>
            Location:
          </Typography>
          <Select value={updatedCity} onChange={(e) => setUpdatedCity(e.target.value)} sx={{ marginTop: 1 }}>
            {truckCities.length > 0 && truckCities.map((city, index) => (
              <MenuItem key={city.city_id + "-" + index} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RentedTrucks;

