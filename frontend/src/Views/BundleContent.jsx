import React, { useEffect, useState } from "react";
import { getBundleTrucks } from "../API/Api";

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

    return<>
    <div className="profile-truck">
        {truckList ? (<>
        {(truckList.length === 1) ? (<>
            <h2>Bundle {props.bundleNumber} ({truckList.length} truck)</h2>
        </>) : (<>
            <h2>Bundle {props.bundleNumber} ({truckList.length} trucks)</h2>
        </>)}
        {truckList.map((truck, index) => (
            <div key={index}>
            <p>{truck.year} {truck.make} {truck.model}</p>
            </div>
        ))}
        </>) : (<>
        <h2>Bundle {props.bundleNumber} (0 trucks)</h2>
        </>)}
    </div>
    <br></br>
    </>;
}