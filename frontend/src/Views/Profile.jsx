import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createVehicleBundle, getBundleTrucks, getTrucksByEmail, getUserByEmail, getUserTruckBundles } from "../API/Api";
//import Box from "@mui/material/Box";
//import IconButton from "@mui/material/IconButton";
//import Avatar from "@mui/material/Avatar";

export default function Profile() {
  const [user, setUser] = useState({})
  const [response, setResponse] = useState({});
  const [truckList, setTruckList] = useState([]);
  const [bundleList, setBundleList] = useState([]);

  const [tab, setTab] = useState(0);

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
        //console.log(res[0]);
        if (res.length > 0) {
          setTruckList(res);
        }
      } else {
        //alert("error invalid email");
      }
    })();
  }, [user.email])

  useEffect(() => {
    (async () => {
      const res = await getUserTruckBundles(user.email);
      if (res) {
        if (res.length > 0) {
          console.log(res);
          setBundleList(res);
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

  function navigateToTruckEditPage(index) {
    navigate(`/truckedit/${index}`);
  };

  function updateTab(index) {
    setTab(index);
  }

  const addBundle = () => {
    console.log("add bundle");
    (async () => {
      await createVehicleBundle(
        user.email, 
        50, 
        100
      );
    })();
  }

  const getTrucksInBundle = (bundleId) => {
    (async () => {
      const res = await getBundleTrucks(bundleId);
      if (res) {
        console.log("trucks in bundle: ", res);
        return res;
      } else {
        //alert("error invalid email");
      }
    })();
  }
  

  return <div className="profile-main"><br></br>
    <header><h1>Your Profile</h1></header>
    <div className="profile-sub">
      <div className="profile-user">
        <button onClick={""} className="profile-avatar">
          <img 
            alt={user.user_name}
            src="http://via.placeholder.com/250x250"
          />
        </button>
        <div>
          <h1>{user.user_name ?? "Loading..."}</h1>
          <h3>{user.email ?? "Loading..."}</h3>
        </div>
      </div>
      <p>User Id: {response.user_id}</p>
      <p>Bio: {response.bio ?? "None set"}</p>
      <p>Location: {response.location ?? "None set"}</p>
      <p>Phone Number: {response.phone ?? "None set"}</p>
      <button onClick={navigateToPage} className="profile-button">Edit Profile</button>
      <br></br><br></br>
      <div className="profile-flex-display">
        {(tab === 0) ? (<>
          <button onClick={() => updateTab(0)} className="profile-tab-selected">Your Trucks ({truckList.length})</button>
          <button onClick={() => updateTab(1)} className="profile-tab-unselected">Your Bundles ({bundleList.length})</button>
        </>) : (<>
          <button onClick={() => updateTab(0)} className="profile-tab-unselected">Your Trucks ({truckList.length})</button>
          <button onClick={() => updateTab(1)} className="profile-tab-selected">Your Bundles ({bundleList.length})</button>
        </>)}
        </div>
        <div className="profile-tab-content">
          {(tab === 0) ? (<>
            {truckList.map((truck, index) => (
              <div key={index}>
                <div  className="profile-truck">
                  <div className="profile-truck-display">
                    <h3>{truck.year} {truck.model}</h3> 
                    <button onClick={() => navigateToTruckEditPage(truck.truck_id)} className="profile-button profile-truck-edit-button">Edit</button>
                    <button className="profile-button profile-truck-edit-button">Add to Bundle</button>
                  </div>
                  <div className="profile-truck-display">
                    <img src={truck.truck_image} alt={truck.model} className="profile-truck-image"/>
                    <div className="profile-truck-text">
                      <p>Mileage: {truck.mileage}</p>
                      <p>Max Miles: {truck.max_miles}</p>
                      <p>Long Discount Days: {truck.long_discount_days}</p>
                      <p>Long Discount Flat: {truck.long_discount_flat}</p>
                      <p>Long Discount Percent: {truck.long_discount_percent}%</p>
                    </div>
                  </div>
                </div>
                <br></br>
              </div>
            ))}
            <button className="profile-button">Add Truck</button>
          </>) : (<>
            {bundleList.map((bundle, index) => (
              <div key={index}>
                <div  className="profile-truck">
                  {(getTrucksInBundle(bundle.bundle_id)) ? (<>
                    <h2>Bundle {index} ({getTrucksInBundle(bundle.bundle_id).length} trucks)</h2>
                    {getTrucksInBundle(bundle.bundle_id).map((truck, index2) => (
                      <div key={index2}>
                        <p>{truck.year} {truck.make} {truck.model}</p>
                      </div>
                    ))}
                  </>) : (<>
                  <h2>Bundle {index} (0 trucks)</h2>
                  </>)}
                </div>
                <br></br>
              </div>
            ))}
            <button onClick={addBundle} className="profile-button">Add Bundle</button>
          </>)}
        </div>
    </div>
    <br></br>
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