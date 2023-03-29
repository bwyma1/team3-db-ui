import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const trucks = [
  {
    id: 1,
    name: "Truck 1",
    image: "https://via.placeholder.com/350x200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: ["Specification 1", "Specification 2", "Specification 3"],
  },
  {
    id: 2,
    name: "Truck 2",
    image: "https://via.placeholder.com/350x200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: ["Specification 1", "Specification 2", "Specification 3"],
  },
  {
    id: 3,
    name: "Truck 3",
    image: "https://via.placeholder.com/350x200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    specifications: ["Specification 1", "Specification 2", "Specification 3"],
  },
];

const TruckRental = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {trucks.map((truck) => (
          <Grid key={truck.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={truck.image}
                alt={truck.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {truck.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truck.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Specifications:
                </Typography>
                {truck.specifications.map((spec, index) => (
                  <Typography key={index} variant="body2">
                    {spec}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TruckRental;
