import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SaleTable from "../components/tables/Sale";
import { ListGroup } from "react-bootstrap";
import moment from "moment-timezone";
import helper from "../helper";
import axios from "axios";

import { useQuery } from "react-query";

export default function Home() {

    const { user } = useSelector((state) => state.auth);

    const { isLoading, data } = useQuery("sale", () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/listings/getRecentListings/2022-07-10`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).then((res) => res.data);
    },{
        staleTime: 30000
    });

    const [date, setDate] = useState(moment().tz('America/Chicago').format('YYYY-MM-DD'));

    const dateRange = helper.getDateRange();

    useEffect(() => {
        document.title = "PowerPages Home";
    },[]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>New Residential Sale - {data} Records</h2><hr />
            <h4>Dates</h4>
            <ListGroup horizontal>
                {dateRange.map((day,dindex) => (
                    <ListGroup.Item as="button" className={day == date && "bg-primary text-light"} onClick={() => setDate(day)} key={`date_${dindex}`}>
                        {day}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="my-4">
                <SaleTable listings={data || []}/>
            </div>
        </>
    )
}