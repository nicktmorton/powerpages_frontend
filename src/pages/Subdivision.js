import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Row,
    Col,
    Table
} from "react-bootstrap";
import SubdivisionTable from "../components/tables/Subdivision";

export default function Subdivision() {

    const { name } = useParams();

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const interval = useRef();

    const getListingsBySubdivision = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getListingsBySubdivision/${name}`)
        .then(res => res.json())
        .then(data => {
            setListings(data);
        });
    };

    useEffect(() => {
        document.title = "PowerPages Subdivision"
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
            <h1>Sold Subdivision - {name} - {listings.length} Records</h1>
            <div className="my-4">
                <SubdivisionTable listings={listings}/>
            </div>
        </>
    )

}