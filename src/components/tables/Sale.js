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
        "mask": "address",
        "sortable": true
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
        "mask": "listingId",
        "link": {
            "path": "/listing/",
            "mask": "listingId"
        }
    },
    {
        "title": "Orig List $",
        "mask": "listPrice"
    },
    {
        "title": "City / ISD",
        "mask": [ "city", "schoolDistrict" ]
    },
    {
        "title": "Zip",
        "mask": "zip"
    },
    {
        "title": "SqFT.",
        "mask": "sqft"
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"]
    },
    {
        "title": "Pool",
        "mask": "pool"
    }
];

export default function SaleTable({ listings }) {

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
            header="Powerpage NEW Listings for SALE - {date}"
            subheader="Map Listings (sat image) - pin dropped for each listing in the list"
            variant="primary"
            mapping={mapping}
            listings={filtered}
            />
        </>
    )

}
