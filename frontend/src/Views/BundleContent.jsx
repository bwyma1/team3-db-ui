import React, { useEffect, useState } from "react";
import { getBundleTrucks, removeVehicleFromBundle } from "../API/Api";

export default function BundleContent(props) {

    const [truckList, setTruckList] = useState([]);

    useEffect(() => {
        (async () => {
        const res = await getBundleTrucks(props.bundleId);
        if (res) {
          //console.log("trucks in bundle: ", res);
          setTruckList(res);
        } else {
          //alert("error invalid email");
        }
    })();
    }, [props.bundleId])

    const removeTruckFromBundle = (bundleId, truckId) => {
        if (bundleId === 0) { return; }
        (async () => {
            console.log("Removing truckID: ", truckId, " from bundleID: ", bundleId);
            await removeVehicleFromBundle(bundleId, truckId);
        })();
    }

    return<>
    <div className="profile-truck">
        {truckList ? (<>
        {(truckList.length === 1) ? (<>
            <h2>Bundle {props.bundleNumber} ({truckList.length} truck)</h2>
        </>) : (<>
            <h2>Bundle {props.bundleNumber} ({truckList.length} trucks)</h2>
        </>)}
        {truckList.map((truck, index) => (
            <div key={index} className="profile-flex-display">
                <p>{truck.year} {truck.make} {truck.model}</p>
                <button onClick={() => removeTruckFromBundle(props.bundleId, truck.truck_id)} className="profile-truck-edit-button">Remove</button>
            </div>
        ))}
        </>) : (<>
        <h2>Bundle {props.bundleNumber} (0 trucks)</h2>
        </>)}
    </div>
    <br></br>
    </>;
}