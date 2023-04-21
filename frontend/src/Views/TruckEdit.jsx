import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { getTruckById, getTrucksByEmail, getUserByEmail, updateProfile } from "../API/Api";
import { AppContext } from "../Context/AppContext";
import { user } from "../Models/user";

export default function TruckEdit() {
    const { id } = useParams();

    const [profile, setProfile] = useState({});
    const [response, setResponse] = useState({});

    const [truck, setTruck] = useState(null);

    function updateTruck(field, value) {
      setTruck((truck) => ({
        [field]: value,
        ...truck,
      }))
    }

    const yearChange = (event) => updateTruck('year', event.target.value);
    const makeChange = (event) => updateTruck('make', event.target.value);
    const modelChange = (event) => updateTruck('model', event.target.value);
    const mileageChange = (event) => updateTruck('mileage', event.target.value);
    const maxMilesChange = (event) => updateTruck('max_miles', event.target.value);
    const lDDaysChange = (event) => updateTruck('long_distance_days', event.target.value);
    const lDFlatChange = (event) => updateTruck('long_distance_flat', event.target.value);
    const lDPercentChange = (event) => updateTruck('long_distance_percent', event.target.value);


    useEffect(() => {
        setProfile(JSON.parse(window.sessionStorage.getItem("user")))
      }, [])

    const navigate = useNavigate();
    const backButton = () => {
        navigate(`/profile`);
    };

    const confirmButton = () => {
        navigate(`/profile`);
    };

    useEffect(() => {
        (async () => {
          console.log(id);
          const res = await getTruckById(id);
          if (res) {
            //console.log(user);
            console.log(res);
            setResponse(res);
            setTruck(res);
          } else {
            //alert("error invalid email");
          }
        })();
      }, [id])

    return<div className="profile-main"><br></br>
      <h2>Edit Truck</h2>
      <div className="profile-sub">
        <p>Year:</p>
        <input
            label="Bio"
            name="bio"
            defaultValue={response.year}
            onChange={yearChange}
        />
        <br></br>
        <p>Make:</p>
        <input
            label="Location"
            name="location"
            defaultValue={response.make}
            onChange={makeChange}
        />
        <br></br>
        <p>Model:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.model}
            onChange={modelChange}
        />
        <p>Mileage:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.mileage}
            onChange={mileageChange}
        />
        <p>Max Miles:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.max_miles}
            onChange={maxMilesChange}
        />
        <p>Long Discount Days:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.long_discount_days}
            onChange={lDDaysChange}
        />
        <p>Long Discount Flat:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.long_discount_flat}
            onChange={lDFlatChange}
        />
        <p>Long Discount Percent:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.long_discount_percent}
            onChange={lDPercentChange}
        />
        <br></br><br></br>
        <button onClick={backButton} className="profile-button profile-edit-button">Cancel</button>
        <button onClick={confirmButton} className="profile-button">Save Changes</button>
      </div>
    </div>;
}