import Table from "../Table";
import {
    Table as BSTable
} from "react-bootstrap";
import { useEffect, useState } from "react";

const columns = [
    "Watch", "Time", "Address", "Subdivision", "MLS #", "Orig List $", "City / ISD",
    "Zip", "SqFT.", "Bed/Bath", "Mstr Bed Lvl", "Pool"
];
const mask = [
    null, "update", "address", "subdivision", "listingId", "listPrice", ["city", "schoolDistrict"],
    "zip", "sqft", ["bed", "bath"], "masterLevel", "pool"
];

export default function LeaseTable({ listings }) {

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
        const watched = [];
        const temp = listings.filter(listing => listing["transactionType"] === "For Lease");
        setFiltered(temp);
    }

    useEffect(() => {
        filterListings();
    },[listings]);

    return (
        <>
            <Table
            header="Powerpage NEW Listings for LEASE - {date}"
            subheader="Map Listings (sat image) - pin dropped for each listing in the list"
            variant="danger"
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
                        <td colSpan={5} className="text-center">Previous 5 Days For Lease Listings</td>
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