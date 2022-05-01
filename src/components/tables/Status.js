import Table from "../Table";
import {
    Table as BSTable
} from "react-bootstrap";
import { useEffect, useState } from "react";

const moment = require("moment");

const columns = [
    "Watch", "Time", "Address", "Subdivision", "MLS #", "Status", "Orig List $", "City / ISD",
    "Zip", "SqFT.", "Bed/Bath", "Mstr Bed Lvl", "Pool"
];
const mask = [
    null, "update", "address", "subdivision", "listingId", "status", "listPrice", ["city", "schoolDistrict"],
    "zip", "sqft", ["bed", "bath"], "masterLevel", "pool"
];

export default function StatusTable({ listings }) {

    const [filtered, setFiltered] = useState([]);

    const getMaskedListing = (listing) => {
        const final = [];
        mask.forEach((element) => {
            if(element === null) {
                final.push(null);
                return;
            }
            if(typeof element == 'string') {
                final.push(listing[element]);
                return;
            }
            if(Array.isArray(element)) {
                const temp = []
                element.forEach(field => {
                    temp.push(listing[field]);
                });
                final.push(temp.join(" / "));
                return;
            }
            final.push(null);
        });
        return final;
    }

    const filterListings = () => {
        const date = moment().utc().subtract(65,'minutes').format("YYYY-MM-DDTHH:mm:ss");
        const watched = [];
        const temp = listings.filter(listing => listing["statusUpdate"] > date);
        setFiltered(temp);
    }

    useEffect(() => {
        filterListings();
    },[listings]);

    return (
        <>
            <Table
            header="Powerpage STATUS Changes - {date}"
            subheader="Map Listings (sat image) - pin dropped for each listing in the list"
            variant="secondary"
            keys={columns} 
            mask={mask}
            values={filtered && filtered.map(listing => {
                return getMaskedListing(listing);
            })}
            linkColumn={4}
            />
            <BSTable bordered size="sm">
                <thead>
                    <tr>
                        <td colSpan={5} className="text-center">Previous 5 Days Status Change Listings</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>date</td>
                        <td>date</td>
                        <td>date</td>
                        <td>date</td>
                        <td>date</td>
                    </tr>
                </tbody>
            </BSTable>
        </>
    )

}