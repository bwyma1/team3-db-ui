import React, { useState }  from "react";
import { Box, Typography, Button, TextField, Select, MenuItem} from "@mui/material";

const ListATruck = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('Year');
  const [mileage, setMileage] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Make: ${make}, Model: ${model}, Year: ${year}, Mileage: ${mileage}`);
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
      {/*Create a form for new truck Listing*/}
      <form onSubmit={handleSubmit}>
      <TextField
        label="Make"
        variant="outlined"
        value={make}
        onChange={(event) => setMake(event.target.value)}
      />
      <TextField
        label="Model"
        variant="outlined"
        value={model}
        onChange={(event) => setModel(event.target.value)}
      />
      <Select 
        label="Year"
        value={year}
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
        value={mileage}
        onChange={(event) => setMileage(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
    </Box>
  );
};

export default ListATruck;
