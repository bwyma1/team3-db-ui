import React, { useState }  from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputAdornment} from "@mui/material";

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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Make: ${make}, Model: ${model}, Year: ${year}, Mileage: ${mileage}`);
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
          value={discountPCT} 
          onChange={(event) => setDiscountPCT(event.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">$</InputAdornment>,
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
        <TextField
          label="Make"
          variant="outlined"
          required
          margin="normal"
          value={make}
          onChange={(event) => setMake(event.target.value)}
        />

        <TextField
          label="Model"
          variant="outlined"
          required
          margin="normal"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />

        <Select 
          label="Year"
          value={year}
          required
          margin="normal"
          onChange={(event) => setYear(event.target.value)}
          variant="outlined"
          >

          <MenuItem value="Year" disabled>
            Year
          </MenuItem>
          
          {renderYearOptions()}
        </Select>

        <TextField
          label="Mileage"
          variant="outlined"
          type="number"
          required
          margin="normal"
          value={mileage}
          onChange={(event) => setMileage(event.target.value)}
        />

        <TextField
          label="Max Mileage"
          variant="outlined"
          type="number"
          required
          margin="normal"
          value={maxMileage}
          onChange={(event) => setMaxMileage(event.target.value)}
        />

        <TextField
          label="Date Available From"
          variant="outlined"
          type="date"
          required
          margin="normal"
          value={sDate}
          onChange={(event) => setSDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Date Available Until"
          variant="outlined"
          type="date"
          required
          margin="normal"
          value={eDate}
          onChange={(event) => setEDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl margin="normal">
          <Select label="Discount?" required value={discount} onChange={(event) => setDiscount(event.target.value)}>
            <MenuItem value="0" disabled> Discount? </MenuItem>
            <MenuItem value="1">No Discount</MenuItem>
            <MenuItem value="2">Yes - % Discount</MenuItem>
            <MenuItem value="3">Yes - Flat Discount</MenuItem>
          </Select>
          {days}
          {discountField}
        </FormControl>

        <Button type="submit" variant="contained" color="primary">Submit</Button>

      </form>
    </Box>
  );
};

export default ListATruck;
