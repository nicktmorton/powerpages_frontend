import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SaleTable from "../components/tables/Sale";
import { ListGroup } from "react-bootstrap";
import moment from "moment-timezone";
import helper from "../helper";

export default function Home() {

    const [listings, setListings] = useState([]);
    const [date, setDate] = useState(moment().tz('America/Chicago').format('YYYY-MM-DD'));

    const dateRange = helper.getDateRange();

    const {user} = useSelector((state) => state.auth);

    const interval = useRef();

    const getListings = async (listDate) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListings/${listDate}`,{
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
        document.title = "PowerPages Home";
        async function fetchData() {
            await getListings(date);
        }
        fetchData();
        interval.current = setInterval(fetchData,31100);
        return () => clearInterval(interval.current);
    },[]);

    useEffect(() => {
        async function fetchData() {
            await getListings(date);
        }
        fetchData();
        clearInterval(interval.current);
        interval.current = setInterval(fetchData,30000);
        return () => clearInterval(interval.current);
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
            <div className="my-4">
                <SaleTable listings={listings}/>
            </div>
        </>
    )
}