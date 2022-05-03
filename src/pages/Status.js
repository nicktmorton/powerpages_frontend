import { useEffect, useState } from "react";
import StatusTable from "../components/tables/Status";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListingsStatus`)
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
        document.title = "PowerPages Status Changes"
    }, []);

    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h1>Status Changes</h1>
            <div className="my-4">
                <StatusTable listings={listings}/>
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