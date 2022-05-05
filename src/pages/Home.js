import { useEffect, useState } from "react";
import SaleTable from "../components/tables/Sale";
import { ListGroup } from "react-bootstrap";
import moment from "moment-timezone";
import helper from "../helper";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [date, setDate] = useState(moment().tz('America/Chicago').format('YYYY-MM-DD'));

    const dateRange = helper.getDateRange();

    let interval;

    const getListings = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListings/${date}`)
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
        interval = setInterval(getListings,30000);
        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        getListings();
        clearInterval(interval);
        interval = setInterval(getListings,30000);
        return () => clearInterval(interval);
    },[date]);

    useEffect(() => {
        document.title = "PowerPages Home"
    }, []);

    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h1>New Residential Sale - {listings.length} Records</h1><hr />
            <h4>Dates</h4>
            <ListGroup horizontal>
                {dateRange.map(day => (
                    <ListGroup.Item as="button" className={day == date && "bg-primary text-light"} onClick={() => setDate(day)}>
                        {day}
                    </ListGroup.Item>
                ))}
            </ListGroup>
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