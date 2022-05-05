import Table from "../Table";

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

export default function SubdivisionTable({ listings }) {

    return (
        <>
            <Table
            header="Powerpage SOLD Listings"
            variant="primary"
            mapping={mapping}
            listings={listings}
            />
        </>
    )

}
