import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import InfoWindowMarker from "./InfoWindowMarker";

const containerStyle = {
    width: '100%',
    height: '900px'
};

const center = {
    lat: 32.7767,
    lng: -96.7970
};

const getAddress = (location) => {
    const pieces = [
        location["streetNumber"],
        location["streetDirPrefix"],
        location["streetName"],
        location["streetSuffix"],
        location["streetDirSuffix"]
    ];
    return pieces.join(' ');
}

export default function Mapping({ listings }) {

    const [mounted, setMounted] = useState(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDrW92gZEbTKTAdd7H-HWvysWff1hZ6lKo"
    });

    useEffect(() => {
        setMounted(true);
    },[]);

    if(!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        >
            {mounted && listings && listings.map((location,index) => {
                if(location['latitude'] != "" && location['longitude'] != "") {
                    const address = getAddress(location);
                    return (
                        <InfoWindowMarker
                            key={index}
                            latitude={location['latitude']}
                            longitude={location['longitude']}
                            address={address}
                        />
                    )
                }
            })}
        </GoogleMap>
    )

};