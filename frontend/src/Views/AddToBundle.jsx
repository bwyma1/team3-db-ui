import React, { useEffect, useState } from "react";
import { addVehicleToBundle, createVehicleBundle, getTrucksByEmail, getUserByEmail, getUserTruckBundles } from "../API/Api";

export default function AddToBundle(props) {
    const [option, setOption] = useState(0);

      const addToBundle = (bundleId, truckId) => {
        if (bundleId === 0) { return; }
        (async () => {
            console.log("Adding truckID: ", truckId, " to bundleID: ", bundleId);
          const res = await addVehicleToBundle(bundleId, truckId);
          if (res) {
            console.log("success");
          } else {
            //alert("error invalid email");
          }
        })();
      }

      const updateBundleOptions = (event) => {
        setOption(event.target.value);
      };

    return<>
    <button onClick={() => addToBundle(option, props.truckId)}className="profile-button profile-truck-edit-button">Add to Bundle
        <select name="selectList" className="profile-bundle-select" id={props.truckId} onChange={updateBundleOptions}>
            <option value={0}>Select Bundle</option>
            {props.bundleList.map((bundle, index) => (
                <option key={index} value={bundle.bundle_id}>{index + 1}</option>
            ))}
        </select>
    </button>
    </>;
}