import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { getUserByEmail } from "../API/Api";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { AppContext } from "../Context/AppContext";

export default function ProfileEdit() {
    const currUser = JSON.parse(window.sessionStorage.getItem("user"));
    const context = useContext(AppContext);

    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");

    const bioChange = (event) => setBio(event.target.value);
    const locationChange = (event) => setLocation(event.target.value);
    const phoneChange = (event) => setPhone(event.target.value);

    const navigate = useNavigate();
    const backButton = () => {
        navigate(`/profile`);
    };

    const [user, setUser] = useState({})
  const [response, setResponse] = useState({});

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

    const confirmButton = () => {
        let newuser = new user(
            user.email,
            user.user_name,
            user.password,
            user.security_question,
            user.security_question_answer,
            user.user_id,
            bio || user.bio,
            location || user.location,
            phone || user.phone_number,
            user.profile_picture
          );
          console.log(newuser);
          context.setCurrUser(new user(
            user.email,
            user.user_name,
            user.password,
            user.security_question,
            user.security_question_answer,
            user.user_id,
            bio || user.bio,
            location || user.location,
            phone || user.phone_number,
            user.profile_picture
          )
          );
          //*/
        navigate(`/profile`);
    };

    return<><br></br>
    <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
    <button onClick={backButton}>Back</button>
    <h2>Edit Profile</h2>
    <TextField
        margin="normal"
        fullWidth
        label="Bio"
        name="bio"
        value={response.user_id}
        onChange={bioChange}
    />
    <TextField
        margin="normal"
        fullWidth
        label="Location"
        name="location"
        value={currUser.location}
        onChange={locationChange}
    />
    <TextField
        margin="normal"
        fullWidth
        label="Phone Number"
        name="phone"
        value={currUser.phone_number}
        onChange={phoneChange}
    />
    <button onClick={confirmButton}>Confirm</button>
    </Box>
    </>;
}