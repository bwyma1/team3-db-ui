import React, { useState, useEffect }  from "react";
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
        Grid
      } from "@mui/material";
import { addTruck } from "../API/Api";
      

const theme = createTheme();

const ListATruck = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('Year');
  const [mileage, setMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountDays, setDiscountDays] = useState('');
  const [discountPCT, setDiscountPCT] = useState('');
  const [discountFlat, setDiscountFlat] = useState('');
  const [dailyPrice, setDailyPrice] = useState('');
  const [currUser, setCurrUser] = useState({})
  const [truckImage, setTruckImage] = useState('');
  const [truckCapcity, setTruckCapacity] = useState('');
  const [truckLoad, setTruckLoad] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (make === '' || model === '' || year === 'Year' || mileage === '' || maxMileage === '' || dailyPrice === '' || truckImage === '' || truckCapcity === '' || truckLoad === '') {
      alert("Please fill out all fields!");
    }
    else{
      if(discount === 1){
        discountDays = 0;
        discountPCT = 0;
        discountFlat = 0;
      }
      else if(discount === 2){
        discountFlat = 0;
      }
      else if(discount === 3){
        discountPCT = 0;
      }
      const addedTruck = addTruck(currUser.email, model, make, year, mileage, maxMileage, discountDays, discountPCT, discountFlat, truckImage, true, truckCapcity, truckLoad, dailyPrice);
      event.target.reset();
    }
  }
  useEffect(() => {
    setCurrUser(JSON.parse(window.sessionStorage.getItem("user")))
}  , [])

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
                  value={truckCapcity}
                  onChange={(event) => setTruckCapacity(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Load Capacity"
                  variant="outlined"
                  required
                  margin="normal"
                  value={truckLoad}
                  onChange={(event) => setTruckLoad(event.target.value)}
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
              label="Truck Image URL"
              variant="outlined"
              required
              fullWidth
              margin="normal"
              value={truckImage}
              onChange={(event) => setTruckImage(event.target.value)}
            />

            <FormControl  fullWidth
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
