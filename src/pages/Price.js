import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PriceTable from "../components/tables/Price";
import { ListGroup } from "react-bootstrap";
import moment from "moment-timezone";
import helper from "../helper";
import { useInterval } from "../utils/interval";

export default function Price() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [date, setDate] = useState(moment().tz('America/Chicago').format('YYYY-MM-DD'));

    const dateRange = helper.getDateRange();

    const {user} = useSelector((state) => state.auth);

    const getListings = async (listDate) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListingsPrice/${listDate}`,{
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
        document.title = "PowerPages Price Changes";
        async function fetchData() {
            await getListings(date);
            setLoading(false);
        }
        fetchData();
        //interval.current = setInterval(fetchData,10000);
        //return () => clearInterval(interval.current);
    },[]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await getListings(date);
            setLoading(false);
        }
        if(!loading) {
            fetchData();
        }
        //clearInterval(interval);
        //interval.current = setInterval(fetchData,10000);
        //return () => clearInterval(interval.current);
    },[date]);

    return (
        <>
            <h1>Price Changes - {listings.length} Records</h1><hr />
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
                    <PriceTable listings={listings}/>
                </div>
            )}
        </>
    )
}