import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getAmenitiesByTruckId } from "../API/Api";


const TruckAmenities = ({ truck_id }) => {
    const [amenities, setAmenities] = useState([]);
    console.log("Truck ID:", truck_id);

    useEffect(() => {
        const fetchAmenities = async () => {
            const amenityData = await getAmenitiesByTruckId(truck_id);
            setAmenities(amenityData);
        };
        fetchAmenities();
    }, [truck_id]);

    return (
        <div>
            <Typography component="h3" variant="h6" fontWeight="bold">
                Amenities:
            </Typography>
            <ul>
                {amenities.map((amenity) => (
                    <li key={amenity.amenity_id}>{amenity.amenity_name}: ${amenity.amenity_price}</li>
                ))}
            </ul>
        </div>
    );
};

export default TruckAmenities;

