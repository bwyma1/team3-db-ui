import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { getTruckById, getTrucksByEmail, getUserByEmail, updateProfile } from "../API/Api";
import { AppContext } from "../Context/AppContext";
import { user } from "../Models/user";

export default function TruckEdit() {
    const { id } = useParams();

    const [profile, setProfile] = useState({});
    const [response, setResponse] = useState({});

    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [mileage, setMileage] = useState("");
    const [maxMiles, setMaxMiles] = useState("");
    const [lDDays, setLDDays] = useState("");
    const [lDFlat, setLDFlat] = useState("");
    const [lDPercent, setLDPercent] = useState("");

    const yearChange = (event) => setYear(event.target.value);
    const makeChange = (event) => setMake(event.target.value);
    const modelChange = (event) => setModel(event.target.value);
    const mileageChange = (event) => setMileage(event.target.value);
    const maxMilesChange = (event) => setMaxMiles(event.target.value);
    const lDDaysChange = (event) => setLDDays(event.target.value);
    const lDFlatChange = (event) => setLDFlat(event.target.value);
    const lDPercentChange = (event) => setLDPercent(event.target.value);


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
            setYear(res.year);
            setMake(res.make);
            setModel(res.model);
            setMileage(res.mileage);
            setMaxMiles(res.max_miles);
            setLDDays(res.long_distance_days);
            setLDFlat(res.long_distance_flat);
            setLDPercent(res.long_distance_percent);
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
        <br></br><br></br>
        <button onClick={backButton} className="profile-button profile-edit-button">Cancel</button>
        <button onClick={confirmButton} className="profile-button">Save Changes</button>
      </div>
    </div>;
}