import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Row,
    Col,
    Table
} from "react-bootstrap";

export default function Listing() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState({});

    const getListing = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getListing/${id}`)
        .then(res => res.json())
        .then(data => {
            setListing(data);
        });
    };

    useEffect(() => {
        async function fetchData() {
            await getListing();
        }
        fetchData().then(setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h3>Listing - {id}</h3>
            <Row>
                <Col xs="12" sm="8">
                    <Row>
                        <Col><img src={(listing['_photos'] && listing['_photos'][0]) || ""} alt="" /></Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <h5>Details</h5>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>List Price</b>: {listing['ListPrice'] ? `$${listing['ListPrice']}` : ''}
                                        </td>
                                        <td>
                                            <b>Bedrooms</b>: {listing['BedroomsTotal'] ? `${listing['BedroomsTotal']}` : ''}
                                        </td>
                                        <td>
                                            <b>Subdiv</b>: {listing['SubdivisionName'] ? `${listing['SubdivisionName']}` : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Sq.Ft.</b>: {listing['LivingArea'] ? `${listing['LivingArea']}` : ''}
                                        </td>
                                        <td>
                                            <b>Bathrooms</b>: {listing['BathroomsTotalInteger'] ? `${listing['BathroomsTotalInteger']}` : ''}
                                        </td>
                                        <td>
                                            <b>Lot Size</b>: {listing['LotSizeDimensions'] ? `${listing['LotSizeDimensions']}` : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Stories</b>: {listing['StoriesTotal'] ? `${listing['StoriesTotal']}` : ''}
                                        </td>
                                        <td>
                                            <b>Liv Areas</b>: {listing['NumberOfLivingAreas'] ? `${listing['NumberOfLivingAreas']}` : ''}
                                        </td>
                                        <td>
                                            <b>Acres</b>: {listing['LotSizeAcres'] ? `${listing['LotSizeAcres']}` : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Yr Blt</b>: {listing['YearBuilt'] ? `${listing['YearBuilt']}` : ''}
                                        </td>
                                        <td>
                                            <b>Pool</b>: {listing['PoolYN'] ? (listing['PoolYN'] == "1" ? 'Yes' : 'No') : ''}
                                        </td>
                                        <td>
                                            <b>HOA</b>: {listing['AssociationFee'] ? `${listing['AssociationFee']}` : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>City</b>: {listing['City'] ? `${listing['City']}` : ''}
                                        </td>
                                        <td>
                                            <b>Garage</b>: {listing['GarageSpaces'] ? `${listing['GarageSpaces']}` : ''}
                                        </td>
                                        <td>
                                            <b>ISD</b>: {listing['SchoolDistrict'] ? `${listing['SchoolDistrict']}` : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>County</b>: {listing['CountyOrParish'] ? `${listing['CountyOrParish']}` : ''}
                                        </td>
                                        <td>
                                            <b>MLS #</b>: {listing['ListingId'] ? `${listing['ListingId']}` : ''}
                                        </td>
                                        <td>
                                            <b>Schools</b>: 
                                            {listing['ElementarySchoolName'] ? ` ${listing['ElementarySchoolName']} / ` : ''}
                                            {listing['MiddleSchoolName'] ? `${listing['MiddleSchoolName']} / ` : ''}
                                            {listing['HighSchoolName'] ? `${listing['HighSchoolName']}` : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Zip</b>: {listing['PostalCode'] ? `${listing['PostalCode']}` : ''}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
                <Col xs="12" sm="4">
                    <h5>Photos</h5>
                    <Row>
                        {listing['_photos'] && listing['_photos'].map((l,index) => (
                            <Col xs="6" className="mb-3" key={index}>
                                <img src={l} alt="" style={{ objectFit: "scale-down", width: "auto", height: "auto", maxHeight: "100%", maxWidth: "100%" }} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}