import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getTrucksByEmail, getUserByEmail } from "../API/Api";

export default function Profile() {
  const [user, setUser] = useState({})
  const [response, setResponse] = useState({});
  //const [truckResponse, setTruckResponse] = useState({});
  const [truckList, setTruckList] = useState([{}]);

  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")))
  }, [])

  useEffect(() => {
    (async () => {
      const res = await getUserByEmail(user.email);
      if (res) {
        //console.log(user);
        console.log(res);
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
        //console.log(user);
        console.log(res);
        //setTruckResponse(res);
        setTruckList([res]);
      } else {
        //alert("error invalid email");
      }
    })();
  }, [user.email])

  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate(`/profileedit`);
  };
  

  return <>
  <header>This is the profile page</header>
  <p>Username: {user.user_name ?? ""}</p>
  <p>Email: {user.email ?? ""}</p>
  <p>Security Question: {user.security_question}</p>
  <p>User Id: {response.user_id}</p>
  <p>Location: {response.location ? response.location : "none"}</p>
  <p>Bio: {response.bio ? response.bio : "none"}</p>
  <button onClick={navigateToPage}>Edit Profile</button>
  <h2>Your Trucks:</h2>
  {truckList.map((truck, index) => (
    <div key={index}>
      <h3>
      {truck.year} {truck.model}
      </h3>
      <p>Mileage: {truck.mileage}</p>
      <p>Max Miles: {truck.max_miles}</p>
      <p>Long Discount Days: {truck.long_discount_days}</p>
      <p>Long Discount Flat: {truck.long_discount_flat}</p>
      <p>Long Discount Percent: {truck.long_discount_percent}</p>
    </div>
  ))}
  </>;
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