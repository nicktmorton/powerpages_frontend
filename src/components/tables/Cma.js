import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Table from "../Table";
import Mapping from "../maps";

const mapping = [
    {
        "title": "Status",
        "mask": "status",
        "sortable": true,
        "sort_type": "string"
    },
    {
        "title": "Update",
        "mask": "update",
        "timestamp": true,
        "sort_type": "string" 
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
        "sort_type": "string"
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
        "title": "Zip",
        "mask": "zip",
        "sortable": true,
        "sort_type": "string"
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
        "title": "Sty",
        "mask": "numStories",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
            {
        "title": "Yr Blt",
        "mask": "yearBuilt",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Gar",
        "mask": "garageSpaces",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Acre",
        "mask": "lotSizeAcres",
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
        "mask": "status",
        "sortable": true,
        "sort_type": "string"
    },
    {
        "title": "Close Date",
        "mask": "closeDate",
        "exclude": "0000-00-00",
        "sort_type": "string"
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
        "sort_type": "string"
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
        "title": "Zip",
        "mask": "zip",
        "sortable": true,
        "sort_type": "string"
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
        "title": "Stories",
        "mask": "numStories",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
    {
        "title": "Yr Blt",
        "mask": "yearBuilt",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Gar",
        "mask": "garageSpaces",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Acre",
        "mask": "lotSizeAcres",
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

    const [view, setView] = useState("table");

    const toggleView = () => view === "table" ? setView("map") : setView("table");

    return (
        <>
            <Button onClick={toggleView} size="sm" className="mt-2">{view === "map" ? "Table": "Satellite"} View</Button>
            <hr />
            {view === "table" ? (
                <Table
                header="Powerpage SOLD Listings Last 180 Days"
                variant="primary"
                mapping={user.level > 2 ? mapping : mappingSecondary}
                listings={listings}
                />
            )
            :
            (<Mapping listings={listings} />)
            }
        </>
    )

}
