import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SaleTable from "../components/tables/Sale";
import { ListGroup, Card } from "react-bootstrap";
import moment from "moment-timezone";
import helper from "../helper";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [date, setDate] = useState(moment().tz('America/Chicago').format('YYYY-MM-DD'));

    const dateRange = helper.getDateRange();

    const interval = useRef();

    const {user} = useSelector((state) => state.auth);

    const getListings = async () => {
        setLoading(true);
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListings/${date}`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setListings(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        document.title = "PowerPages Home"
        async function fetchData() {
            await getListings();
        }
        fetchData();
        //interval.current = setInterval(fetchData,10000);
        //return () => clearInterval(interval.current);
    },[]);

    useEffect(() => {
        async function fetchData() {
            await getListings();
        }
        fetchData();
        //clearInterval(interval);
        //interval.current = setInterval(fetchData,10000);
        //return () => clearInterval(interval.current);
    },[date]);

    return (
        <>
            <h1>New Residential Sale - {listings.length} Records</h1><hr />
            <h4>Dates</h4>
            <ListGroup horizontal>
                {dateRange.map((day,dindex) => (
                    <ListGroup.Item as="button" className={day == date && "bg-primary text-light"} onClick={() => setDate(day)} key={`date_${dindex}`}>
                        {day}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {!loading && (
            <div className="my-4">
                <SaleTable listings={listings}/>
            </div>
            )}
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