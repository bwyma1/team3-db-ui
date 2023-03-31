import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useMemo } from "react";
import { getUserByEmail } from "../API/Api";

export default function Profile() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  
  function getUser() {
    (async () => {
      const response = await getUserByEmail(user.email);
      
      if (response) {
        console.log(response);
        return response;
      } else {
        alert("error invalid email");
      }
    })();
  }

  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate(`/profileedit`);
  };
  

  return <>
  <header>This is the profile page</header>
  <p>Username: {user.user_name}</p>
  <p>Email: {user.email}</p>
  <p>Security Question: {user.security_question}</p>
  <p>User Id: {getUser() ? getUser().user_id : "undefined"}</p>
  <p>Location: {user.location}</p>
  <p>Bio: {user.bio}</p>
  <button onClick={navigateToPage}>Edit Profile</button>
  </>;
}
