import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '900px'
};

const center = {
    lat: 32.7767,
    lng: -96.7970
};

const createKey = (location) => {
    return location.lat + location.lng
};

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
            {mounted && listings && listings.map((location) => (
                <Marker
                key={createKey(location)}
                position={{ lat: location['latitude'], lng: location['longitude'] }}
                />
            ))}
        </GoogleMap>
    )

};