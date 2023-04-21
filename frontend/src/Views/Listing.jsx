import { Box, Container, Grid } from "@mui/material";
import ListATruck from "./ListATruck";
import ListAnAmenity from "./ListAnAmenity";

export default function Listing() {
  return (
    <Container component="main" maxWidth="lg">
        <Box
            sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <ListATruck />
                </Grid>
                <Grid item md={6}>
                    <ListAnAmenity />
                </Grid>
            </Grid>
        </Box>
    </Container>
  );
}
