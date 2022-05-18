import Table from "../Table";
import { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const mapping = [
    {
        "title": "Watch",
        "mask": null
    },
    {
        "title": "Update",
        "mask": "update",
        "timestamp": true
    },
    {
        "title": "List Date",
        "mask": "listDate"
    },
    {
        "title": "Address",
        "mask": [ "streetNumber","streetDirPrefix", "streetName", "streetSuffix", "streetDirSuffix" ],
        "delimiter": " ",
        "link": {
            "path": "/listing/",
            "mask": "listingId"
        }
    },
    {
        "title": "Subdivision",
        "mask": "subdivision",
        "sortable": true,
        "sort_type": "link",
        "link": {
            "path": "/subdivision/",
            "mask": "subdivision"
        }
    },
    {
        "title": "MLS #",
        "mask": "listingId"
    },
    {
        "title": "Current / Orig $",
        "mask": [ "listPrice", "originalPrice" ],
        "delimiter": " / ",
        "price": true
    },
    {
        "title": "City",
        "mask": "city",
        "sortable": true,
        "sort_type": "string"
    },
    {
        "title": "ISD",
        "mask": "schoolDistrict"
    },
    {
        "title": "Zip",
        "mask": "zip",
        "sortable": true,
        "sort_type": "string"
    },
    {
        "title": "SqFT.",
        "mask": "sqft",
        "number": true   
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
    {
        "title": "Pool",
        "mask": "pool"
    }
];

export default function SaleTable({ listings }) {

    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [subset, setSubset] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        zip: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilters(prev => ({...prev, [name]: value}));
    }

    const filterListings = () => {
        setLoading(true);
        Promise.all(filtered.filter(listing => {
            const good = true;
            if (filters["city"] != "") {
                console.log("Filter: ", listing["city"] === filters["city"]);
                return listing["city"] === filters["city"];
            }
            return true;
        }))
        .then(res => {
            setSubset(res);
            setLoading(false);
        });
    }

    const resetFilters = () => {
        setLoading(true);
        setFilters({
            city: "",
            zip: ""
        });
        Promise.all(setSubset([]))
        .then(() => setLoading(false));
    }

    useEffect(() => {
        const filterListings = async () => {
            //const watched = [];
            const temp = await listings.filter(listing => listing["transactionType"] === "For Sale");
            setFiltered(temp);
        }
        filterListings();
        setLoading(false);
    },[listings]);

    if(loading || filtered.length === 0) return (<div>Loading...</div>)

    return (
        <>
            <hr />
            <h4>Filters</h4>
            <Row className="mb-3">
                <Col sm={6} lg={4}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" name="city" value={filters["city"]} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mt-2">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="text" name="zip" value={filters["zip"]} onChange={handleChange}/>
                                </Form.Group>
                                <div className="mt-3 d-flex justify-content-between">
                                    <Button size="sm" onClick={filterListings} className="float-start">Apply</Button>
                                    <Button size="sm" onClick={resetFilters} className="float-end">Reset</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Table
            header="Powerpage NEW RESIDENTIAL SINGLE FAMILY Listings for SALE"
            variant="primary"
            mapping={mapping}
            listings={subset.length > 0 ? subset : filtered}
            />
        </>
    )

}
