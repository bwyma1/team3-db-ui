import React, { useState }  from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { addUser } from "../API/Api";

const ListATruck = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Email: ${email}`);
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
        label="Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
    </Box>
  );
};

export default ListATruck;
