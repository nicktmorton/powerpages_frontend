import { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Table from "../Table";

const mapping = [
    {
        "title": "Status",
        "mask": "status"
    },
    {
        "title": "Update",
        "mask": "update",
        "timestamp": true
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
        "mask": "subdivision"
    },
    {
        "title": "MLS #",
        "mask": "listingId"
    },
    {
        "title": "Current / List $",
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
        "title": "Stories",
        "mask": "numStories"
    },
    {
        "title": "DOM",
        "mask": "daysOnMarket",
        "sortable": true,
        "sort_type": "int"
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

const mappingSecondary = [
    {
        "title": "Status",
        "mask": "status"
    },
    {
        "title": "Close Date",
        "mask": "closeDate",
        "exclude": "0000-00-00"
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
        "mask": "subdivision"
    },
    {
        "title": "MLS #",
        "mask": "listingId"
    },
    {
        "title": "Sold / Last $",
        "mask": [ "closePrice", "listPrice" ],
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
        "title": "Stories",
        "mask": "numStories"
    },
    {
        "title": "DOM",
        "mask": "daysOnMarket",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "SqFT.",
        "mask": "sqft",
        "number": true,
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Bed/Bath/Mstr Lvl",
        "mask": [ "bed", "bath", "masterLevel"],
        "delimiter": " / "
    },
    {
        "title": "Year Built",
        "mask": "yearBuilt",
        "sortable": true,
        "sort_type": "int"
    },
    {
        "title": "Pool",
        "mask": "pool"
    }
];

export default function SubdivisionTable({ listings }) {

    const {user} = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);
    const [fresh, setFresh] = useState(true);
    const [subset, setSubset] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        zip: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilters(prev => ({...prev, [name]: value}));
    };

    // Note that the 'Subdivision' doesnt need a subdivision filter
    const filterListings = async (initial,localFilters) => {
        setLoading(true);
        if(!localFilters["city"] && !localFilters["zip"] && !localFilters["subdivision"]) {
            localStorage.removeItem('POWERPAGES_FILTERS')
            setFilters({
                city: "",
                zip: ""
            });
            setFresh(true);
            setLoading(false);
            return;
        }
        setFresh(false);
        if(!initial) {
            localStorage.setItem('POWERPAGES_FILTERS',JSON.stringify(localFilters));
        }
        const res = listings.filter(listing => {
            if (localFilters["city"] != "") {
                const cityArr = localFilters["city"].split(",").map(f => f.trim().toLowerCase());
                if(!(cityArr.includes(listing["city"].toLowerCase()))){
                    return false;
                }
            }
            if(localFilters["zip"] != "") {
                const zipArr = localFilters["zip"].split(",").map(f => f.trim().toLowerCase());
                if(!(zipArr.includes(listing["zip"].toLowerCase()))){
                    return false;
                }
            }
            return true;
        });
        if(res) {
            setSubset(res);
        } else {
            setSubset([]);
        }
        console.log("Loading state after filter: ",loading);
        setLoading(false);
    };

    const resetFilters = () => {
        localStorage.removeItem('POWERPAGES_FILTERS')
        setFilters({
            city: "",
            zip: ""
        });
        setSubset([]);
        setFresh(true);
    };

    useEffect(() => {
        setLoading(true);
        async function handleInitialFilters() {
            const data = JSON.parse(window.localStorage.getItem('POWERPAGES_FILTERS'));
            if(data != null) {
                setFilters(data);
                if(data["city"] || data["zip"]) {
                    await filterListings(true,data);
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        handleInitialFilters();
    },[listings]);

    if(loading) {
        return(<div>Loading...</div>)
    }

    return (
        <>
            <hr />
            <h4>Filters</h4>
            <Row className="mb-3">
                <Col xs={12} sm={10}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Form>
                                <small>* Multiple filters must be comma-separated</small>
                                <Row className="mt-2">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" name="city" value={filters["city"]} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="text" name="zip" value={filters["zip"]} onChange={handleChange} size="sm"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3 d-flex justify-content-between">
                                    <Button size="sm" onClick={() => filterListings(false,filters)} className="float-start">Apply</Button>
                                    <Button size="sm" onClick={resetFilters} className="float-end">Reset</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Table
            header="Powerpage SOLD Listings Last 90 Days"
            variant="primary"
            mapping={user.level > 2 ? mapping : mappingSecondary}
            listings={fresh === true ? (listings || []) : subset}
            />
        </>
    )

}
