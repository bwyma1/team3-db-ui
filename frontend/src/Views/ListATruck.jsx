import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  Input
} from "@mui/material";
import { addTruck, postCity, postTruckCity, getCity } from "../API/Api";


const theme = createTheme();

const ListATruck = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('Year');
  const [mileage, setMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountDays, setDiscountDays] = useState(0);
  const [discountPCT, setDiscountPCT] = useState(0);
  const [discountFlat, setDiscountFlat] = useState(0);
  const [dailyPrice, setDailyPrice] = useState('');
  const [user, setUser] = useState({})
  const [truckImage, setTruckImage] = useState('');
  const [truckCapacity, setTruckCapacity] = useState('');
  const [cargoCapacity, setCargoCapacity] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (make === '' || model === '' || year === 'Year' || mileage === '' || maxMileage === '' || dailyPrice === '' || truckImage === '' || truckCapacity === '' || cargoCapacity === '') {
      alert("Please fill out all fields!");
    }
    else {
      let updatedDiscountDays = discountDays;
      let updatedDiscountPCT = discountPCT;
      let updatedDiscountFlat = discountFlat;
  
      if (discount === 1) {
        updatedDiscountDays = 0;
        updatedDiscountPCT = 0;
        updatedDiscountFlat = 0;
      }
      else if (discount === 2) {
        updatedDiscountFlat = 0;
      }
      else if (discount === 3) {
        updatedDiscountPCT = 0;
      }

      console.log(`ID: ${user.user_id}, Make: ${make}, Model: ${model}, Year: ${year}, Mileage: ${mileage}, Max Mileage: ${maxMileage}, Discount: ${discount}, Discount Days: ${discountDays}, Discount PCT: ${discountPCT}, Discount Flat: ${discountFlat}, Daily Price: ${dailyPrice}, Truck Image: ${truckImage}, Truck Capacity: ${truckCapacity}, Truck Capacity: ${cargoCapacity}`)
      const addedTruck = await addTruck(user.user_id, model, make, year, mileage, maxMileage, discountDays, discountPCT, discountFlat, truckImage, truckCapacity, cargoCapacity, dailyPrice);
      const truckId = addedTruck.data.truck_id;
      if (cities.length > 0) {
        // Add cities to the database and associate them with the truck
        for (const cityName of cities) {
          let cityData = await getCity(cityName);
          if (!cityData || cityData.length === 0) {
            await postCity(cityName);
            cityData = await getCity(cityName);
          }
          const cityId = cityData[0].city_id;
          await postTruckCity(truckId, cityId);
        }
      }
      event.target.reset();
      // navigate to profile page
      navigate("/profile");
    }
  }
  const handleAddCity = (event) => {
    event.preventDefault();
    if (cityInput !== '') {
      setCities([...cities, cityInput]);
      setCityInput('');
    }
  };

  const handleRemoveCity = (cityIndex) => {
    const newCities = [...cities];
    newCities.splice(cityIndex, 1);
    setCities(newCities);
  }


  let days;
  let discountField;

  switch (discount) {
    case "1":
      discountField = null;
      break;
    case "2":
      days = (
        <TextField
          label="Days needed for discount"
          variant="outlined"
          type="number"
          required
          margin="normal"
          value={discountDays}
          onChange={(event) => setDiscountDays(event.target.value)}
        />
      );

      discountField = (
        <TextField
          label="Discount %"
          variant="outlined"
          type="number"
          required
          margin="normal"
          value={discountPCT}
          onChange={(event) => setDiscountPCT(event.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      );
      break;
    case "3":
      days = (
        <TextField
          label="Days needed for discount"
          variant="outlined"
          type="number"
          required
          margin="normal"
          value={discountDays}
          onChange={(event) => setDiscountDays(event.target.value)}
        />
      );

      discountField = (
        <TextField
          label="Discount $"
          variant="outlined"
          type="number"
          required
          margin="normal"
          value={discountFlat}
          onChange={(event) => setDiscountFlat(event.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      );
      break;
    default:
      discountField = null;
      break;
  }

  const renderYearOptions = () => {
    const startYear = new Date().getFullYear();
    const endYear = 1900;
    const yearOptions = [];
    for (let year = startYear; year >= endYear; year--) {
      yearOptions.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }
    return yearOptions;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create A New Truck Listing
          </Typography>

          <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Make"
                  variant="outlined"
                  required
                  margin="normal"
                  value={make}
                  onChange={(event) => setMake(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Model"
                  variant="outlined"
                  required
                  margin="normal"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Passengers"
                  variant="outlined"
                  required
                  margin="normal"
                  value={truckCapacity}
                  onChange={(event) => setTruckCapacity(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Load Capacity"
                  variant="outlined"
                  required
                  margin="normal"
                  value={cargoCapacity}
                  onChange={(event) => setCargoCapacity(event.target.value)}
                />
              </Grid>
            </Grid>

            <Select
              label="Year"
              fullWidth
              value={year}
              required
              onChange={(event) => setYear(event.target.value)}
            >

              <MenuItem value="Year" disabled>
                Year
              </MenuItem>

              {renderYearOptions()}
            </Select>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Mileage"
                  variant="outlined"
                  type="number"
                  required
                  value={mileage}
                  margin="normal"
                  onChange={(event) => setMileage(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mi</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Max Mileage"
                  variant="outlined"
                  type="number"
                  required
                  margin="normal"
                  value={maxMileage}
                  onChange={(event) => setMaxMileage(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mi</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              label="Daily Price"
              variant="outlined"
              type="number"
              fullWidth
              required
              margin="normal"
              value={dailyPrice}
              onChange={(event) => setDailyPrice(event.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Cities"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cityInput}
              onChange={(event) => setCityInput(event.target.value)}
            />

            <Box marginBottom={2}>
              <Button
                variant="contained"
                margin="normal"
                color="primary"
                onClick={handleAddCity}
                disabled={!cityInput}
              >
                Add City
              </Button>
            </Box>

            {cities.map((city, index) => (
              <Box key={index} display="flex" alignItems="center" marginBottom={1}>
                <Typography variant="subtitle1" sx={{ marginRight: 2 }}>{city}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleRemoveCity(index)}
                  sx={{ marginLeft: "auto" }} // Add marginLeft auto to the "Remove" button
                >
                  Remove
                </Button>
              </Box>
            ))}
            <TextField
              label="Truck Image URL"
              variant="outlined"
              required
              fullWidth
              margin="normal"
              value={truckImage}
              onChange={(event) => setTruckImage(event.target.value)}
            />

            <FormControl fullWidth
              sx={{
                margin: "normal"
              }}
            >
              <Select label="Discount?" required value={discount} onChange={(event) => setDiscount(event.target.value)}>
                <MenuItem value="0" disabled> Discount? </MenuItem>
                <MenuItem value="1">No Discount</MenuItem>
                <MenuItem value="2">Yes - % Discount</MenuItem>
                <MenuItem value="3">Yes - $ Discount</MenuItem>
              </Select>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {days}
                </Grid>
                <Grid item xs={6}>
                  {discountField}
                </Grid>
              </Grid>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" margin="normal" color="primary">Submit</Button>

          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ListATruck;
