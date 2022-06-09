import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SubdivisionTable from "../components/tables/Subdivision";

export default function Subdivision() {

    const { name } = useParams();

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const interval = useRef();

    const {user} = useSelector((state) => state.auth);

    const getListingsBySubdivision = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getListingsBySubdivision/${name}`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setListings(data);
        });
    };

    useEffect(() => {
        document.title = "PowerPage Subdivision"
        async function fetchData() {
            await getListingsBySubdivision();
            setLoading(false);
        }
        fetchData();
        interval.current = setInterval(getListingsBySubdivision,30000);
        return () => clearInterval(interval.current);
    },[]);


    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h2>Last 90 Days Sold Subdivision - {name} - {listings.length} Records</h2><hr />
            <div className="my-4">
                <SubdivisionTable listings={listings}/>
            </div>
        </>
    )

}
