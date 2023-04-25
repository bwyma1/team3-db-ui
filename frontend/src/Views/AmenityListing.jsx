import React, { useEffect, useState } from "react";
import { getAmenitiesByTruckId } from "../API/Api";

export default function AmenityListing(props) {

    const [amenityList, setAmenityList] = useState([]);

    useEffect(() => {
        (async () => {
        const res = await getAmenitiesByTruckId(props.truckId);
        if (res) {
          //console.log("trucks in bundle: ", res);
          //console.log(res);
          setAmenityList(res);
        } else {
          //alert("error invalid email");
        }
    })();
    }, [props.truckId])


    return<>
    <div>
        {amenityList ? (<>
            {amenityList.length === 0 ? (<>
            </>) : (<>
                <h4>Amenities:</h4>
                {amenityList.map((amenity, index) => (
                <div key={index} className="profile-flex-display">
                    <p>{amenity.amenity_name}: ${amenity.amenity_price}</p>
                </div>
            ))}
            </>)}
            </>) 
        : (<></>)}
    </div>
    <br></br>
    </>;
}