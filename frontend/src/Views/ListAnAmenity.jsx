import React, { useState, useEffect }  from "react";
import { addTruckAmenity, getTrucksByEmail} from "../API/Api";
import {
        Box,
        Typography,
        Button,
        TextField,
        Select,
        MenuItem,
        InputAdornment,
        ThemeProvider,
        createTheme,
        Container,
        CssBaseline,
        Grid
      } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const ListAnAmenity = () => {

    const [truckId, setTruckId] = useState(0);
    const [amenityName, setAmenityName] = useState('');
    const [amenityPrice, setAmenityPrice] = useState('');
    const [truckList, setTruckList] = useState([]);
    const navigate = useNavigate();

    const [currUser, setCurrUser] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        if(truckId === 0 || amenityName === '' || amenityPrice === ''){
            alert("Please fill out all fields!");
        }
        else{
            const addedAmenity = addTruckAmenity(truckId, amenityName, amenityPrice);
            event.target.reset();
            navigate("/profile");

        }
    }

    useEffect(() => {
        setCurrUser(JSON.parse(window.sessionStorage.getItem("user")))
    }, [])

    useEffect(() => {
    (async () => {
        const res = await getTrucksByEmail(currUser.email);
        if (res) {
        //console.log(res);
        if (res.length > 0) {
            setTruckList(res);
        }
        } else {
        //alert("error invalid email");
        }
    })();
    }, [currUser.email])

    const renderUserTrucks = () => {
        const truckOptions = [];
        truckList.forEach((truck, index) => {
          truckOptions.push(
            <MenuItem key={index} value={truck.truck_id}>
              {`${truck.make} ${truck.model} (${truck.year})`}
            </MenuItem>
          );
        });
        return truckOptions;
    };

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
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
                List an Amenity
                </Typography>
    
                <form onSubmit={handleSubmit}>
    
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      label="Amenity Name"
                      variant="outlined"
                      required
                      margin="normal"
                      value={amenityName}
                      onChange={(event) => setAmenityName(event.target.value)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Amenity Price"
                      variant="outlined"
                      type="number"
                      fullWidth
                      required
                      margin="normal"
                      value={amenityPrice} 
                      onChange={(event) => setAmenityPrice(event.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>

                <Select 
                  label="Truck"
                  fullWidth
                  value={truckId}
                  required
                  onChange={(event) => setTruckId(event.target.value)}
                >
    
                  <MenuItem value="0" disabled>
                    Select a Truck
                  </MenuItem>
                  
                  {renderUserTrucks()}
                </Select>
    

                <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
    
              </form>
            </Box>
          </Container>
        </ThemeProvider>
      );

};

export default ListAnAmenity;