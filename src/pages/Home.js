import Table from "../components/Table";
import { useEffect, useState } from "react";

const columns = [
    "Watch", "Time", "Address", "Subdivision", "MLS #", "Orig List $", "City / ISD",
    "Zip", "SqFT.", "Bed/Bath", "Mstr Bed Lvl", "Pool"
];
const mask = [
    null, "update", "address", "subdivision", "listingId", "listPrice", ["city", "schoolDistrict"],
    "zip", "sqft", ["bed", "bath"], "masterLevel", "pool"
];

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListings`)
        .then(res => res.json())
        .then(data => {
            setListings(data);
        });
    };

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

    useEffect(() => {
        async function fetchData() {
            await getListings();
            setLoading(false);
        }
        fetchData().then(setLoading(false));
    },[]);

    useEffect(() => {
        setInterval(getListings,30000);
    },[]);

    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h1>Home Page</h1>
            <Table
            header="Powerpage NEW Listings for SALE - {date}"
            subheader="Map Listings (sat image) - pin dropped for each listing in the list"
            variant="primary"
            keys={columns} 
            mask={mask}
            values={listings && listings.map(listing => {
                return getMaskedListing(listing);
            })}
            linkColumn={4}
            />
        </>
    )
}