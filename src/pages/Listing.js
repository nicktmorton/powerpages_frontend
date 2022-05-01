import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Row,
    Col
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
                        <h5>Details</h5>
                        <table>
                            <tr>
                                <td>
                                    List Price: {listing['ListPrice'] ? `$${listing['ListPrice']}` : ''}
                                </td>
                                <td>
                                    Bedrooms: {listing['BedroomsTotal'] ? `${listing['BedroomsTotal']}` : ''}
                                </td>
                                <td>
                                    Subdiv: {listing['SubdivisionName'] ? `${listing['SubdivisionName']}` : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Sq.Ft.: {listing['LivingArea'] ? `${listing['LivingArea']}` : ''}
                                </td>
                                <td>
                                    Bathrooms: {listing['BathroomsTotalInteger'] ? `${listing['BathroomsTotalInteger']}` : ''}
                                </td>
                                <td>
                                    Lot Size: {listing['LotSizeDimensions'] ? `${listing['LotSizeDimensions']}` : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Stories: {listing['StoriesTotal'] ? `${listing['StoriesTotal']}` : ''}
                                </td>
                                <td>
                                    Liv Areas: {listing['NumberOfLivingAreas'] ? `${listing['NumberOfLivingAreas']}` : ''}
                                </td>
                                <td>
                                    Acres: {listing['LotSizeAcres'] ? `${listing['LotSizeAcres']}` : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Yr Blt: {listing['YearBuilt'] ? `${listing['YearBuilt']}` : ''}
                                </td>
                                <td>
                                    Pool: {listing['PoolYN'] ? (listing['PoolYN'] == "1" ? 'Yes' : 'No') : ''}
                                </td>
                                <td>
                                    HOA: {listing['AssociationFee'] ? `${listing['AssociationFee']}` : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    City: {listing['City'] ? `${listing['City']}` : ''}
                                </td>
                                <td>
                                    Garage: {listing['GarageSpaces'] ? `${listing['GarageSpaces']}` : ''}
                                </td>
                                <td>
                                    ISD: {listing['SchoolDistrict'] ? `${listing['SchoolDistrict']}` : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    County: {listing['CountyOrParish'] ? `${listing['CountyOrParish']}` : ''}
                                </td>
                                <td>
                                    MLS #: {listing['ListingId'] ? `${listing['ListingId']}` : ''}
                                </td>
                                <td>
                                    Schools: 
                                    {listing['ElementarySchoolName'] ? ` ${listing['ElementarySchoolName']} / ` : ''}
                                    {listing['MiddleSchoolName'] ? `${listing['MiddleSchoolName']} / ` : ''}
                                    {listing['HighSchoolName'] ? `${listing['HighSchoolName']}` : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Zip: {listing['PostalCode'] ? `${listing['PostalCode']}` : ''}
                                </td>
                            </tr>
                        </table>
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