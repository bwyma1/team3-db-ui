import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { getAllBundles, getBundleTrucks, addToUserBundleTrucks, updateBundleAvailability } from "../API/Api";

const BundleRental = () => {
    const [bundles, setBundles] = useState([]);
    const [user, setUser] = useState({});
    const [response, setResponse] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(window.sessionStorage.getItem("user")));
    }, []);

    useEffect(() => {
        const fetchBundles = async () => {
            try {
                const allBundles = await getAllBundles();
                const bundlePromises = allBundles.map(async (bundle) => {
                    const trucks = await getBundleTrucks(bundle.bundle_id);
                    return { ...bundle, trucks };
                });
                const completeBundles = await Promise.all(bundlePromises);
                setBundles(completeBundles);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBundles();
    }, []);

    const handleRentBundle = async (bundle) => {
        try {
          const today = new Date();
          const endDate = new Date(today);
          endDate.setDate(today.getDate() + 7);
      
          const todayISO = today.toISOString().split("T")[0];
          const endDateISO = endDate.toISOString().split("T")[0];
      
          await addToUserBundleTrucks(user.user_id, bundle.trucks, todayISO, endDateISO, "Los Angeles");
          await updateBundleAvailability(bundle.bundle_id, 0); // Update bundle availability after renting
          navigate("/currentrentals");
        } catch (err) {
          console.log(err);
        }
      };
      

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h4" sx={{
                textAlign: "center", color: "black", padding: "2rem", width: "100%", backgroundColor: "rgba(211, 211, 211, 0.2)"
            }}>
                Available Bundles
            </Typography>
            <Box sx={{
                width: "100%", borderTop: "2px solid", borderColor: "gray", borderRadius: "0px",
                marginBottom: "3rem", backgroundColor: "rgba(211, 211, 211, 0.2)"
            }}>
                {bundles.map((bundle, index) => (
                    <Box key={bundle.bundle_id} sx={{ p: 3, borderBottom: "1px solid #ccc" }}>
                        <Typography component="h2" variant="h5" fontWeight="bold">
                            Bundle {index + 1}
                        </Typography>
                        <Typography component="p" variant="h6">
                            Discount Percent: {bundle.discount_percent}%
                        </Typography>
                        <Typography component="p" variant="h6">
                            Discount Flat: ${bundle.discount_flat.toFixed(2)}
                        </Typography>
                        <Typography component="h3" variant="h6" fontWeight="bold" mt={2}>
                            Trucks in Bundle:
                        </Typography>
                        <List>
                            {bundle.trucks.map((truck) => (
                                <ListItem key={truck.truck_id}>
                                    <Box sx={{ mr: 2 }}>
                                        <img src={truck.truck_image} alt={truck.model} width="300" />
                                    </Box>
                                    <ListItemText>
                                        {truck.make} {truck.model} ({truck.year})
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                        <Button variant="contained" onClick={() => handleRentBundle(bundle)} sx={{ mt: 2, mr: 2 }}>
                            Rent this bundle
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default BundleRental;