import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SaleTable from "../components/tables/Sale";
import { ListGroup } from "react-bootstrap";
import moment from "moment-timezone";
import helper from "../helper";
import axios from "axios";

import { useQuery } from "react-query";

const today = moment().tz('America/Chicago').format('YYYY-MM-DD');
const dateRange = helper.getDateRange();

async function fetchListings(token, date = today) {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListings/${date}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => res.data);
}

export default function Home() {

    const { user } = useSelector((state) => state.auth);

    const [date, setDate] = useState(today);

    const { data, error, isLoading, isFetching, isError } = useQuery(
        ["sale",user.token,date],
        () => fetchListings(user.token, date),
        { refetchInterval: 30000 }
    );

    useEffect(() => {
        document.title = "PowerPages Home";
        console.log("Hello");
    },[]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>New Residential Sale - {data.length} Total Records</h2><hr />
            <h4>Dates</h4>
            <ListGroup horizontal>
                {dateRange.map((day,dindex) => (
                    <ListGroup.Item as="button" className={day === date && "bg-primary text-light"} onClick={() => setDate(day)} key={`date_${dindex}`}>
                        {day}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="my-4">
                <SaleTable listings={data}/>
            </div>
        </>
    )
}
