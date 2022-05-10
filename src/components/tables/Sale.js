import Table from "../Table";
import { useEffect, useState } from "react";

const mapping = [
    {
        "title": "Watch",
        "mask": null
    },
    {
        "title": "Update",
        "mask": "update",
        "timestamp": true
    },
    {
        "title": "List Date",
        "mask": "listDate"
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
        "delimiter": " / ",
        "price": true
    },
    {
        "title": "City",
        "mask": "city",
        "sortable": true
    },
    {
        "title": "ISD",
        "mask": "schoolDistrict"
    },
    {
        "title": "Zip",
        "mask": "zip",
        "sortable": true
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

export default function SaleTable({ listings }) {

    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);

    const filterListings = () => {
        //const watched = [];
        const temp = listings.filter(listing => listing["transactionType"] === "For Sale");
        setFiltered(temp);
    }

    useEffect(() => {
        setLoading(false);
        filterListings();
    },[]);

    if(loading || filtered.length === 0) return (<div>Loading...</div>)

    return (
        <>
            <Table
            header="Powerpage NEW RESIDENTIAL SINGLE FAMILY Listings for SALE"
            variant="primary"
            mapping={mapping}
            listings={filtered}
            />
        </>
    )

}
