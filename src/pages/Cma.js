import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import CmaTable from "../components/tables/Cma";
import axios from "axios";

import { useQuery } from "react-query";

async function fetchListings(token, search) {
    console.log("Token: ",token);
    console.log("Search: ",search);
    return fetch(`${process.env.REACT_APP_API_URL}/api/listings/getListingsByCma`,{
        method: 'post',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(search)
    }).then((res) => res.json());
}

export default function Cma() {

    const { user } = useSelector((state) => state.auth);

    const [search, setSearch] = useState({
        city: "",
        zip: "",
        subdivision: ""
    });
    const [searchError, setSearchError] = useState("");

    const { data, error, isLoading, isFetching, isError, refetch } = useQuery(
        ["cma"],
        () => fetchListings(user.token, search),
        {
            enabled: false,
            staleTime: 2 * 60 * 60 * 1000,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );

    const getListingsByCma = () => {
        if(search["city"] === "" && search["zip"] === "" && search["subdivision"] === "") {
            setSearchError("Please apply at least one filter");
            return;
        }
        setSearchError("");
        refetch();
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearch(prev => ({...prev, [name]: value}));
    };

    const resetSearch = () => {
        localStorage.removeItem('POWERPAGES_FILTERS')
        setSearch({
            city: "",
            zip: "",
            subdivision: ""
        });
        setSearchError("");
    };

    useEffect(() => {
        document.title = "PowerPage CMA";
    },[]);

    return (
        <>
            <h2>Last 180 Days Sold / Under Contract / Pending {data && data.length > 0 && ` - ${data.length} Records`}</h2>
            <hr />
            <h4>Filters for One-Line CMA</h4>
            <Row className="mb-3">
                <Col xs={12} sm={10}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Form>
                                <small>NOTE: Multiple filters must be comma-separated</small><br/>
                                <small>NOTE: Subdivision names can use a wildcard (*) prefix and/or suffix</small>
                                <Row className="mt-4">
                                    <Col xs={5}>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" name="city" value={search["city"]} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="text" name="zip" value={search["zip"]} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Group>
                                            <Form.Label>Subdivision</Form.Label>
                                            <Form.Control type="text" name="subdivision" value={search["subdivision"]} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3 d-flex justify-content-between">
                                    <Button size="sm" onClick={() => getListingsByCma()} disabled={isLoading || isFetching}>Apply</Button>
                                    <Button size="sm" onClick={resetSearch} className="float-end" disabled={isLoading || isFetching}>Reset</Button>
                                </div>
                                {searchError && <small className="text-danger">* {searchError}</small>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {isLoading || isFetching ? 'Searching...' : (data && data.length > 0 && <CmaTable listings={data}/>)}
        </>
    )

}
