import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getTrucksByEmail, getUserByEmail } from "../API/Api";
import Box from "@mui/material/Box";

export default function Profile() {
  const [user, setUser] = useState({})
  const [response, setResponse] = useState({});
  const [truckList, setTruckList] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")))
  }, [])

  useEffect(() => {
    (async () => {
      const res = await getUserByEmail(user.email);
      if (res) {
        //console.log(res);
        setResponse(res);
      } else {
        //alert("error invalid email");
      }
    })();
  }, [user.email])

  useEffect(() => {
    (async () => {
      const res = await getTrucksByEmail(user.email);
      if (res) {
        //console.log(res);
        if (res.length > 0) {
          setTruckList(res);
        }
      } else {
        //alert("error invalid email");
      }
    })();
  }, [user.email])

  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate(`/profileedit`);
  };
  

  return <div className="profile-main"><br></br>
  <header>This is the profile page</header>
  <p>Username: {user.user_name ?? ""}</p>
  <p>Email: {user.email ?? ""}</p>
  <p>Security Question: {user.security_question}</p>
  <p>User Id: {response.user_id}</p>
  <p>Location: {response.location ?? "none"}</p>
  <p>Bio: {response.bio ?? "none"}</p>
  <button onClick={navigateToPage} className="profile-button">Edit Profile</button>
  <h2>Your Trucks:</h2>
  {truckList.map((truck, index) => (
    <div>
    <div key={index} className="profile-truck">
      <h3>
      {truck.year} {truck.model}
      </h3>
      <p>Mileage: {truck.mileage}</p>
      <p>Max Miles: {truck.max_miles}</p>
      <p>Long Discount Days: {truck.long_discount_days}</p>
      <p>Long Discount Flat: {truck.long_discount_flat}</p>
      <p>Long Discount Percent: {truck.long_discount_percent}</p>
    </div>
    <br></br>
    </div>
  ))}
  <button className="profile-button">Add Truck</button>
  </div>;
}

/*
{truckList.map((truck, index) => (
    <div>
      <h1>
      {index}
      </h1>
    </div>
  ))}
*/