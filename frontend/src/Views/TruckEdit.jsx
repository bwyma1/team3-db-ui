import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getTruckById, updateTruckById } from "../API/Api";
import { Button } from "@mui/material";

export default function TruckEdit() {
    const { id } = useParams();

    const [response, setResponse] = useState({});

    const [truck, setTruck] = useState({});

    const updateTruck = (field, value) => {
      setTruck({
        ...truck,
        [field]: value
      });
    };

    const yearChange = (event) => updateTruck("year", event.target.value);
    const makeChange = (event) => updateTruck('make', event.target.value);
    const modelChange = (event) => updateTruck('model', event.target.value);
    const mileageChange = (event) => updateTruck('mileage', event.target.value);
    const maxMilesChange = (event) => updateTruck('max_miles', event.target.value);
    const lDDaysChange = (event) => updateTruck('long_discount_days', event.target.value);
    const lDFlatChange = (event) => updateTruck('long_discount_flat', event.target.value);
    const lDPercentChange = (event) => updateTruck('long_discount_percent', event.target.value);


    const navigate = useNavigate();
    const backButton = () => {
        navigate(`/profile`);
    };

    const confirmButton = () => {
      console.log("TRUCK: ", truck);
      
      (async () => {
        await updateTruckById(
          id,
          truck.year,
          truck.make,
          truck.model,
          truck.mileage,
          truck.max_miles,
          truck.long_discount_days,
          truck.long_discount_flat,
          truck.long_discount_percent,
          1,
          2,
          3,
          truck.truck_image
        );
      })();
        navigate(`/profile`);
    };

    useEffect(() => {
        (async () => {
          //console.log(id);
          const res = await getTruckById(id);
          if (res) {
            //console.log(res);
            setResponse(res);
            setTruck(res);
          } else {
            //alert("error invalid email");
          }
        })();
      }, [id])

    return(<div className="profile-main"><br></br>
      <h2>Edit Truck Info</h2>
      <div className="profile-sub profile-edit-form">
        <div className="profile-flex-display">
          Year:
          <input
              label="Year"
              name="year"
              defaultValue={response.year}
              onChange={yearChange}
          />
        </div>
        <br></br>
        <div className="profile-flex-display">
          Make:
          <input
              label="Location"
              name="location"
              defaultValue={response.make}
              onChange={makeChange}
          />
        </div>
        <br></br>
        <div className="profile-flex-display">
        Model:
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.model}
            onChange={modelChange}
        />
        </div>
        <br></br>
        <div className="profile-flex-display">
        Mileage:
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.mileage}
            onChange={mileageChange}
        />
        </div>
        <br></br>
        <div className="profile-flex-display">
        Max Miles:
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.max_miles}
            onChange={maxMilesChange}
        />
        </div>
        <br></br>
        <div className="profile-flex-display">
        Long Discount Days:
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.long_discount_days}
            onChange={lDDaysChange}
        />
        </div>
        <br></br>
        <div className="profile-flex-display">
        Long Discount Flat:
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.long_discount_flat}
            onChange={lDFlatChange}
        />
        </div>
        <br></br>
        <div className="profile-flex-display">
        Long Discount Percent:
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.long_discount_percent}
            onChange={lDPercentChange}
        />
        </div>
        <br></br>
        <div className="profile-flex-display">
          <Button variant="contained" color="grey" onClick={backButton} className="profile-button profile-edit-button">Cancel</Button>
          <div className="profile-margin-left">
            <Button variant="contained" onClick={confirmButton} className="profile-button">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>);
}