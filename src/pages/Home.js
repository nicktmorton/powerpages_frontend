import { useEffect, useState } from "react";
import SaleTable from "../components/tables/Sale";

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

    useEffect(() => {
        document.title = "PowerPages Home"
    }, []);

    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h1>New Residential Sale - {listings.length} Records</h1>
            <div className="my-4">
                <SaleTable listings={listings}/>
            </div>
            {/* <br />
            <div className="my-4">
                <LeaseTable listings={listings}/>
            </div>
            <br />
            <div className="my-4">
                <PriceTable listings={listings}/>
            </div>
            <br />
            <div className="my-4">
                <StatusTable listings={listings}/>
            </div> */}
        </>
    )
}