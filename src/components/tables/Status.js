import Table from "../Table";
import { useEffect, useState } from "react";

const mapping = [
    {
        "title": "Watch",
        "mask": null
    },
    {
        "title": "Time",
        "mask": "update",
        "sortable": true,
        "timestamp": true
    },
    {
        "title": "Address",
        "mask": [ "streetNumber","streetDirPrefix", "streetName", "streetSuffix", "streetDirSuffix" ],
        "delimiter": " ",
        "link": {
            "path": "/listing/",
            "mask": "listingId"
        }
    },
    {
        "title": "Subdivision",
        "mask": "subdivision",
        "sortable": true,
        "link": {
            "path": "/subdivision/",
            "mask": "subdivision"
        }
    },
    {
        "title": "MLS #",
        "mask": "listingId"
    },
    {
        "title": "Orig / Current $",
        "mask": [ "originalPrice", "listPrice" ],
        "price": true
    },
    {
        "title": "City / ISD",
        "mask": [ "city", "schoolDistrict" ],
        "delimiter": " / "
    },
    {
        "title": "Zip",
        "mask": "zip"
    },
    {
        "title": "SqFT.",
        "mask": "sqft",
        "number": true   
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
    {
        "title": "Pool",
        "mask": "pool"
    }
];

export default function StatusTable({ listings }) {

    const [filtered, setFiltered] = useState([]);

    const filterListings = () => {
        const watched = [];
        const temp = listings.filter(listing => listing["transactionType"] === "For Sale");
        setFiltered(temp);
    }

    useEffect(() => {
        filterListings();
    },[listings]);

    return (
        <>
            <Table
            header="Powerpage STATUS CHANGES"
            variant="dark"
            mapping={mapping}
            listings={filtered}
            />
        </>
    )

}