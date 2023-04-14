import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useMemo } from "react";
import { getUserByEmail } from "../API/Api";
import { TextField } from "@mui/material";

export default function ProfileEdit() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const navigate = useNavigate();
  const backButton = () => {
    navigate(`/profile`);
  };

  let event = null;
  const data = new FormData(event.currentTarget);
  const confirmButton = () => {
    let newuser = new user(
      user.email,
      user.user_name,
      data.get("password") || user.password,
      user.security_question,
      user.security_question_answer,
      user.user_id,
      data.get("bio") || user.bio,
      data.get("location") || user.location,
      data.get("phone") || user.phone_number,
      data.get("profilepicture") || user.profile_picture
    );
    navigate(`/profile`);
  };

  return (
    <>
      <br></br>
      <button onClick={backButton}>Back</button>
      <h2>Edit Profile</h2>
      <TextField
        sx={{
          margin: "normal"
        }}
        fullWidth
        label="Bio"
        name="bio"
        value={user.bio}
      />
      <TextField
        sx={{
          margin: "normal"
        }}
        fullWidth
        label="Location"
        name="location"
        value={user.location}
      />
      <TextField
        sx={{
          margin: "normal"
        }}
        fullWidth
        name="password"
        label="Password"
        type="password"
        defaultValue={user.password}
      />
      <TextField
        sx={{
          margin: "normal"
        }}
        fullWidth
        label="Phone Number"
        name="phone"
        value={user.phone_number}
      />
      <button onClick={confirmButton}>Confirm</button>
    </>
  );
}
