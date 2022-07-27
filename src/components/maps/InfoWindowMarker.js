import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

export default function InfoWindowMarker({ index, latitude, longitude, address }) {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
        <Marker
        key={index}
        position={{ lat: latitude, lng: longitude }}
        onClick={toggleOpen}
        >
            {open && (
                <InfoWindow onCloseClick={toggleOpen} position={{ lat: latitude, lng: longitude }}>
                    <p>{address}</p>   
                </InfoWindow>
            )}
        </Marker>
    )

} 