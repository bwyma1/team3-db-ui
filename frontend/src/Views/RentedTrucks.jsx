import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { getUserRentedTrucks } from "../API/Api";

const RentedTrucks = () => {
  const [user, setUser] = useState({});
  const [rentedTrucks, setRentedTrucks] = useState([]);

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
          <Card key={rentedTruck.rent_id} sx={{ minWidth: 300 }}>
            <CardMedia
              component="img"
              height="140"
              image={rentedTruck.truck_image}
              alt={rentedTruck.model}
            />
            <CardContent>
              <Typography component="h2" variant="h6" fontWeight="bold" mb={1}>
                {rentedTruck.model} ({rentedTruck.year})
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                Price: ${rentedTruck.price}/day
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                Start Date: {rentedTruck.start_date}
              </Typography>
              <Typography component="p" variant="h5" mb={1}>
                End Date: {rentedTruck.end_date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RentedTrucks;

