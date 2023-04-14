import React, { useState }  from "react";
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

const theme = createTheme();

const ListATruck = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('Year');
  const [mileage, setMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [sDate, setSDate] = useState('');
  const [eDate, setEDate] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountDays, setDiscountDays] = useState('');
  const [discountPCT, setDiscountPCT] = useState('');
  const [discountFlat, setDiscountFlat] = useState('');
  const [dailyPrice, setDailyPrice] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Make: ${make}, Model: ${model}, Year: ${year}, Mileage: ${mileage}, Max Mileage: ${maxMileage}, Start Date: ${sDate}, End Date: ${eDate}, Discount: ${discount}, Discount Days: ${discountDays}, Discount PCT: ${discountPCT}, Discount Flat: ${discountFlat}`);
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
          sx={{
            margin: "normal"
          }}
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
          sx={{
            margin: "normal"
          }}
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
          sx={{
            margin: "normal"
          }}
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
          sx={{
            margin: "normal"
          }}
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
                  sx={{
                    margin: "normal"
                  }}
                  value={make}
                  onChange={(event) => setMake(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Model"
                  variant="outlined"
                  required
                  sx={{
                    margin: "normal"
                  }}
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                />
              </Grid>
            </Grid>

            <Select 
              label="Year"
              fullWidth
              value={year}
              required
              sx={{
                margin: "normal"
              }}
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
                  sx={{
                    margin: "normal"
                  }}
                  value={mileage}
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
                  sx={{
                    margin: "normal"
                  }}
                  value={maxMileage}
                  onChange={(event) => setMaxMileage(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mi</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Date Available From"
                  fullWidth
                  variant="outlined"
                  type="date"
                  required
                  sx={{
                    margin: "normal"
                  }}
                  value={sDate}
                  onChange={(event) => setSDate(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date Available Until"
                  variant="outlined"
                  fullWidth
                  type="date"
                  required
                  value={eDate}
                  onChange={(event) => setEDate(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
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
              sx={{
                margin: "normal"
              }}
              value={dailyPrice} 
              onChange={(event) => setDailyPrice(event.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
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

            <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>

          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ListATruck;
