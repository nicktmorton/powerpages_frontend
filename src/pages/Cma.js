import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import CmaTable from "../components/tables/Cma";

export default function Cma() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [searching, setSearching] = useState(false);
    const [search, setSearch] = useState({
        city: "",
        zip: "",
        subdivision: ""
    });
    const [searchError, setSearchError] = useState("");

    const {user} = useSelector((state) => state.auth);

    const getListingsByCma = async () => {
        if(search["city"] === "" && search["zip"] === "" && search["subdivision"] === "") {
            setSearchError("Please apply at least one filter");
            return;
        }
        setSearchError("");
        setSearching(true);
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getListingsByCma`,{
            method: 'post',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(search)
        })
        .then(res => res.json())
        .then(data => {
            setListings(data);
            setSearching(false);
        });
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
        setLoading(false);
    },[]);


    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h2>Last 180 Days Sold - {listings.length} Records</h2>
            <hr />
            <h4>Filters</h4>
            <Row className="mb-3">
                <Col xs={12} sm={10}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Form>
                                <small>* Multiple filters must be comma-separated</small>
                                <Row className="mt-2">
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
                                    <Button size="sm" onClick={() => getListingsByCma()}>Apply</Button>
                                    <Button size="sm" onClick={resetSearch} className="float-end">Reset</Button>
                                </div>
                                {searchError && <small className="text-danger">* {searchError}</small>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {searching ? 'Searching...' : (listings.length > 0 && <CmaTable listings={listings}/>)}
        </>
    )

}
