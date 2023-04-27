import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { getUserRentedTrucks, updateUserRentedTruck, getTruckCities } from "../API/Api";
import { useLocation } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Grid} from "@mui/material";



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
    if (editingTruck) {
      setUpdatedEndDate(editingTruck.end_date);
    }
  }, [editingTruck]);
    

  useEffect(() => {
    if (truckCities.length > 0) {
      setUpdatedCity(truckCities[0].name);
    }
  }, [truckCities]);

  const getNextTwelveDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 12; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const year = nextDay.getFullYear();
      const month = String(nextDay.getMonth() + 1).padStart(2, "0");
      const day = String(nextDay.getDate()).padStart(2, "0");
      days.push(`${year}-${month}-${day}`);
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
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate() + 1).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };
  

  const handleSaveClick = async () => {
    try {
      await updateUserRentedTruck(editingTruck.truck_rent_id, updatedEndDate, updatedCity);
      setOpenDialog(false);
      const updatedRentedTrucks = rentedTrucks.map((truck) =>
        truck.truck_rent_id === editingTruck.truck_rent_id
          ? { ...truck, end_date: updatedEndDate, selectedCity: updatedCity }
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
      <Typography component="h1" variant="h3" sx={{ marginBottom: 4 }}>
        Your Rented Trucks
      </Typography>
      <Grid container spacing={4}>
        {rentedTrucks.map((rentedTruck) => (
          <Grid item xs={12} sm={6} key={rentedTruck.truck_id}>
            <Card sx={{ maxWidth: "90%", margin: "2rem" }}>
              <CardMedia
                component="img"
                height="250rem"
                image={rentedTruck.truck_image}
                alt={rentedTruck.model}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h4"
                    fontWeight="bold"
                  >
                    {rentedTruck.make} {rentedTruck.model} ({rentedTruck.year})
                  </Typography>
                  <Typography
                    component="p"
                    variant="h4"
                    fontWeight="bold"
                  >
                    ${rentedTruck.price}/day
                  </Typography>
                </Box>
                <Typography component="p" variant="h5" mb={1}>
                  Return Location: {rentedTruck.selectedCity}
                </Typography>
                <Typography component="p" variant="h5" mb={1}>
                  Start Date: {formatDate(rentedTruck.start_date)}
                </Typography>
                <Typography component="p" variant="h5" mb={1}>
                  End Date: {formatDate(rentedTruck.end_date)}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick(rentedTruck)}
                  sx={{ mt: 2, mr: 2 }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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

