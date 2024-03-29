import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  addVehicleToBundle,
  createVehicleBundle,
  getTrucksByEmail,
  getUserByEmail,
  getUserTruckBundles,
} from "../API/Api";
import BundleContent from "./BundleContent";
import AddToBundle from "./AddToBundle";
import AmenityListing from "./AmenityListing";
import ListATruck from "./ListATruck";
import { Button } from "@mui/material";
//import Box from "@mui/material/Box";
//import IconButton from "@mui/material/IconButton";
//import Avatar from "@mui/material/Avatar";

export default function Profile() {
  const [user, setUser] = useState({});
  const [response, setResponse] = useState({});
  const [truckList, setTruckList] = useState([]);
  const [bundleList, setBundleList] = useState([]);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")));
  }, []);

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
  }, [user.email]);

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
  }, [user.email]);

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
  }, [user.email]);

  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate(`/profileedit`);
  };

  function navigateToTruckEditPage(index) {
    navigate(`/truckedit/${index}`);
  }

  function updateTab(index) {
    setTab(index);
  }

  const addBundle = () => {
    (async () => {
      await createVehicleBundle(user.email, 50, 100);
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
    })();
  };

  return (
    <div className="profile-main">
      <br></br>
      <header>
        <h1>Your Profile</h1>
      </header>
      <div className="profile-sub">
        <div className="profile-user">
          <div className="profile-avatar">
            <img
              alt={user.user_name}
              src="http://via.placeholder.com/250x250"
            />
          </div>
          <div>
            <h1>{user.user_name ?? "Loading..."}</h1>
            <h3>{user.email ?? "Loading..."}</h3>
          </div>
        </div>
        <p>{response.bio ?? "No bio set"}</p>
        <p>Location: {response.location ?? "None set"}</p>
        <p>Phone: {response.phone ?? "None set"}</p>
        <Button variant="contained" onClick={navigateToPage} className="profile-button">
          Edit Profile
        </Button>
        <br></br>
        <br></br>
        <div className="profile-flex-display">
          {tab === 0 ? (
            <>
              <button
                onClick={() => updateTab(0)}
                className="profile-tab-selected"
              >
                Your Trucks ({truckList.length})
              </button>
              <button
                onClick={() => updateTab(1)}
                className="profile-tab-unselected"
              >
                Your Bundles ({bundleList.length})
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => updateTab(0)}
                className="profile-tab-unselected"
              >
                Your Trucks ({truckList.length})
              </button>
              <button
                onClick={() => updateTab(1)}
                className="profile-tab-selected"
              >
                Your Bundles ({bundleList.length})
              </button>
            </>
          )}
        </div>
        <div className="profile-tab-content">
          {tab === 0 ? (
            <>
              {truckList.map((truck, index) => (
                <div key={index}>
                  <div className="profile-truck">
                    <div className="profile-truck-display">
                      <h3>
                        {truck.year} {truck.make} {truck.model}
                      </h3>
                      <div className="profile-padding">
                        <Button
                          variant="contained"
                          onClick={() => navigateToTruckEditPage(truck.truck_id)}
                          className="profile-button profile-truck-edit-button"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="profile-padding">
                        <AddToBundle
                          bundleList={bundleList}
                          truckId={truck.truck_id}
                        />
                      </div>
                    </div>
                    <div className="profile-truck-display">
                      <img
                        src={truck.truck_image}
                        alt={truck.model}
                        className="profile-truck-image"
                      />
                      <div className="profile-truck-text">
                        <p>Mileage: {truck.mileage}</p>
                        <p>Max Miles: {truck.max_miles}</p>
                        <p>Long Discount Days: {truck.long_discount_days}</p>
                        <p>Long Discount Flat: {truck.long_discount_flat}</p>
                        <p>
                          Long Discount Percent: {truck.long_discount_percent}%
                        </p>
                      </div>
                    </div>
                    <div className="profile-amenities">
                      <AmenityListing truckId={truck.truck_id} />
                    </div>
                  </div>
                  <br></br>
                </div>
              ))}
            </>
          ) : (
            <>
              {bundleList.map((bundle, index) => (
                <div key={index}>
                  <BundleContent
                    bundleId={bundle.bundle_id}
                    bundleNumber={index + 1}
                  />
                </div>
              ))}
              <Button variant="contained" onClick={addBundle} className="profile-button">
                Create New Bundle
              </Button>
            </>
          )}
        </div>
      </div>
      <br></br>
    </div>
  );
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
