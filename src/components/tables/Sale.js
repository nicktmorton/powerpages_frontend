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
        "sort_type": "link",
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
        "title": "Current / Orig $",
        "mask": [ "listPrice", "originalPrice" ],
        "delimiter": " / ",
        "price": true
    },
    {
        "title": "City",
        "mask": "city",
        "sortable": true,
        "sort_type": "string"
    },
    {
        "title": "ISD",
        "mask": "schoolDistrict"
    },
    {
        "title": "Zip",
        "mask": "zip",
        "sortable": true,
        "sort_type": "string"
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

    useEffect(() => {
        const filterListings = async () => {
            //const watched = [];
            const temp = await listings.filter(listing => listing["transactionType"] === "For Sale");
            setFiltered(temp);
        }
        filterListings();
        setLoading(false);
    },[listings]);

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
