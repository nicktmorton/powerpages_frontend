import Table from "../Table";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import Mapping from "../maps";

const mapping = require("../../json/projections/Sale.json");

const initialFilters = JSON.parse(window.localStorage.getItem('POWERPAGES_FILTERS'));

const filterListings = (filters,listings) => {
    let running = false;
    let cityArr = [];
    let zipArr = [];
    let subArr = [];
    if("city" in filters && filters["city"] !== "") {
        running = true;
        cityArr = filters["city"].split(",").map(f => f.trim().toLowerCase());
    }
    if("zip" in filters && filters["zip"] !== "") {
        running = true;
        zipArr = filters["zip"].split(",").map(f => f.trim().toLowerCase());
    }
    if("subdivision" in filters && filters["subdivision"] !== "") {
        running = true;
        subArr = filters["subdivision"].split(",").map(f => f.split(/\s+/).join(''));
        console.log("Here: ",subArr);
    }
    if(!running) {
        return listings;
    }
    const res = listings.filter(listing => {
        if (filters["city"] !== "") {
            if(!(cityArr.includes(listing["city"].toLowerCase()))){
                return false;
            }
        }
        if(filters["zip"] !== "") {
            if(!(zipArr.includes(listing["zip"].toLowerCase()))){
                return false;
            }
        }
        if (filters["subdivision"] !== "") {
            if(listing["subdivision"] === "") {
                return false;
            }
            if(!(subArr.some(s => {
                const temp = `${s.split(/\s+/).join('')}`;
                const reg = new RegExp(temp,'i');
                return reg.test(listing["subdivision"].split(/\s+/).join(''))
            }))){
                return false;
            }
        }
        return true;
    });
    return res;
}

export default function SaleTable({ listings, setFilteredTotal }) {

    const [inputs, setInputs] = useState({
        "city": initialFilters && initialFilters["city"] || "",
        "zip": initialFilters && initialFilters["zip"] || "",
        "subdivision": initialFilters && initialFilters["subdivision"] || ""
    });
    const [filters, setFilters] = useState({
        "city": initialFilters && initialFilters["city"] || "",
        "zip": initialFilters && initialFilters["zip"] || "",
        "subdivision": initialFilters && initialFilters["subdivision"] || ""
    });
    const [view, setView] = useState("table");

    const toggleView = () => view === "table" ? setView("map") : setView("table");

    const submitFilters = () => {
        setFilters(inputs);
        localStorage.setItem('POWERPAGES_FILTERS',JSON.stringify(inputs));
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(prev => ({...prev, [name]: value}));
    };

    const filteredListings = useMemo(() => {
        return filterListings(filters, listings, setFilteredTotal);
    },[filters, listings]);

    const resetFilters = () => {
        setFilteredTotal(0);
        localStorage.removeItem('POWERPAGES_FILTERS')
        setFilters({
            city: "",
            zip: "",
            subdivision: ""
        });
        setInputs({
            city: "",
            zip: "",
            subdivision: ""
        });
    };

    useEffect(() => {
        setFilteredTotal(filteredListings.length);
    },[filteredListings])

    return (
        <>
            <Button onClick={toggleView} size="sm" className="mt-2">{view === "map" ? "Table": "Satellite"} View</Button>
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
                                            <Form.Control type="text" name="city" value={inputs["city"] || ""} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="text" name="zip" value={inputs["zip"] || ""} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Group>
                                            <Form.Label>Subdivision</Form.Label>
                                            <Form.Control type="text" name="subdivision" value={inputs["subdivision"] || ""} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3 d-flex justify-content-between">
                                    <Button size="sm" onClick={submitFilters} className="float-start">Apply</Button>
                                    <Button size="sm" onClick={resetFilters} className="float-end">Reset</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {view === "table" ? (
                <Table
                header="NEW Residential Single Family Listings - Properites for both SALE or LEASE will show on both SALE and LEASE tables"
                variant="primary"
                mapping={mapping}
                listings={filteredListings}
                />
            )
            :
            (<Mapping listings={filteredListings} />)
            }
        </>
    )

}
