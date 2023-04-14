import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { getUserByEmail, updateProfile } from "../API/Api";
import { AppContext } from "../Context/AppContext";
import { user } from "../Models/user";

export default function ProfileEdit() {
    //const currUser = JSON.parse(window.sessionStorage.getItem("user"));
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

    const [profile, setProfile] = useState({})
  const [response, setResponse] = useState({});

  useEffect(() => {
    setProfile(JSON.parse(window.sessionStorage.getItem("user")))
  }, [])

  useEffect(() => {
    (async () => {
      const res = await getUserByEmail(profile.email);
      if (res) {
        //console.log(user);
        console.log(res);
        setResponse(res);
        setBio(res.bio);
        setLocation(res.location);
        setPhone(res.phone);
      } else {
        //alert("error invalid email");
      }
    })();
  }, [profile.email])

    const confirmButton = () => {
        let newuser = new user(
          profile.email,
          profile.user_name,
          profile.password,
          profile.security_question,
          profile.security_question_answer,
          profile.user_id,
          bio === "" ? profile.bio : bio,
          location === "" ? profile.location : location,
          phone ==="" ? profile.phone_number : phone,
          1
        );
        console.log(newuser);
        
        context.setCurrUser(new user(
          profile.email,
          profile.user_name,
          profile.password,
          profile.security_question,
          profile.security_question_answer,
          profile.user_id,
          bio === "" ? profile.bio : bio,
          location === "" ? profile.location : location,
          phone ==="" ? profile.phone_number : phone,
          1
        )
        );

        (async () => {
          await updateProfile(
            profile.email, 
            bio === "" ? response.bio : bio, 
            1, 
            location === "" ? response.location : location, 
            phone === "" ? response.phone_number : phone
          );
        })();
        navigate(`/profile`);
    };

    return<div className="profile-main"><br></br>
      <h2>Edit Profile</h2>
      <div className="profile-sub">
        <p>Bio:</p>
        <input
            type="text"
            label="Bio"
            name="bio"
            defaultValue={response.bio}
            onChange={bioChange}
        />
        <br></br>
        <p>Location:</p>
        <input
            label="Location"
            name="location"
            defaultValue={response.location}
            onChange={locationChange}
        />
        <br></br>
        <p>Phone Number:</p>
        <input
            label="Phone Number"
            name="phone"
            defaultValue={response.phone}
            onChange={phoneChange}
        />
        <br></br><br></br>
        <button onClick={backButton} className="profile-button profile-edit-button">Cancel</button>
        <button onClick={confirmButton} className="profile-button">Save Changes</button>
      </div>
    </div>;
}
