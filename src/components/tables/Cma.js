import { useSelector } from "react-redux";
import Table from "../Table";

const mapping = [
    {
        "title": "Status",
        "mask": "status"
    },
    {
        "title": "Update",
        "mask": "update",
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
        "mask": "subdivision"
    },
    {
        "title": "MLS #",
        "mask": "listingId"
    },
    {
        "title": "Current / Prev List",
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
        "title": "Stories",
        "mask": "numStories"
    },
    {
        "title": "DOM",
        "mask": "daysOnMarket",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "SqFT.",
        "mask": "sqft",
        "number": true,
        "sortable": true,
        "sort_type": "int" 
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
            {
        "title": "Year Built",
        "mask": "yearBuilt",
        "sortable": true,
        "sort_type": "int"
    },
        {
        "title": "Garage",
        "mask": "GarageSpaces",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Pool",
        "mask": "pool"
    }
];

const mappingSecondary = [
    {
        "title": "Status",
        "mask": "status"
    },
    {
        "title": "Close Date",
        "mask": "closeDate",
        "exclude": "0000-00-00"
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
        "mask": "subdivision"
    },
    {
        "title": "MLS #",
        "mask": "listingId"
    },
    {
        "title": "Sold / Prev List",
        "mask": [ "closePrice", "listPrice" ],
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
        "title": "Stories",
        "mask": "numStories"
    },
    {
        "title": "DOM",
        "mask": "daysOnMarket",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "SqFT.",
        "mask": "sqft",
        "number": true,
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
    {
        "title": "Year Built",
        "mask": "yearBuilt",
        "sortable": true,
        "sort_type": "int"
    },
        {
        "title": "Garage",
        "mask": "GarageSpaces",
        "sortable": true,
        "sort_type": "int"
    },
     {
        "title": "Lot Size",
        "mask": "LotSizeDimensions",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Pool",
        "mask": "pool"
    }
];

export default function CmaTable({ listings }) {

    const {user} = useSelector((state) => state.auth);

    return (
        <Table
        header="Powerpage SOLD Listings Last 180 Days"
        variant="primary"
        mapping={user.level > 2 ? mapping : mappingSecondary}
        listings={listings}
        />
    )

}
