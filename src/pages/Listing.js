import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
    Row,
    Col,
    Table
} from "react-bootstrap";

export default function Listing() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState({});
    const [currentImage, setCurrentImage] = useState(null);

    const {user} = useSelector((state) => state.auth);

    const getListing = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getListing/${id}`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setListing(data);
        });
    };

    const formatDate = (update) => {
        const date = new Date(update);
        const fmtDate = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return fmtDate + " at " + strTime;
    }

    useEffect(() => {
        async function fetchData() {
            await getListing();
        }
        fetchData().then(setLoading(false));
        document.title = "PowerPages Property Detail"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if(loading) return ( <div>Loading...</div> )

    return (
        <>
            <h3>{listing['StreetNumber']} {listing['StreetName']} {listing['StreetSuffix']}</h3>
            <Row>
                <Col xs="12" lg="8">
                    <Row>
                        <Col><img src={ currentImage ? currentImage : (listing['_photos'] && listing['_photos'][0]) || ""} alt="" style={{border:"3px solid black"}} /></Col>
                        <p><a href={`https://www.google.com/maps?t=k&q=loc:${listing['Latitude']},${listing['Longitude']}&ll=${listing['Latitude']},${listing['Longitude']}`} target={"blank"}>Satellite View</a></p>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <h5>Details</h5>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>List Price</b>: {listing['ListPrice'] ? `${parseInt(listing['ListPrice']).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : ''}
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

                            <p>{listing['PublicRemarks']}</p>

                            <div className="mt-4">
                                <img src="/ntreis.png" />
                                <p>Listing Courtesy of {listing['ListAgentFullName']} of {listing['ListOfficeName']}</p>
                                <p>© 2022 North Texas Real Estate Information Systems. All rights reserved. Information is 
                                    deemed reliable, but is not guaranteed accurate by the MLS or NTREIS. The information being provided 
                                    is for the consumers personal, non-commercial use, and may not be reproduced, redistributed or used 
                                    for any purpose other than to identify prospective properties consumers may be interested in purchasing. 
                                    Data last updated: {formatDate(listing['ModificationTimestamp'])}
                                    </p>   
                            </div>  

                        </Col>
                    </Row>
                </Col>
                <Col xs="12" lg="4">
                    <h5>Photos</h5>
                    <Row>
                        {listing['_photos'] && listing['_photos'].map((l,index) => (
                            <Col xs="6" className="mb-3" key={index}>
                                <img src={l} alt="" onClick={()=>setCurrentImage(l)} style={{ objectFit: "scale-down", width: "auto", height: "auto", maxHeight: "100%", maxWidth: "100%", border:"3px solid black" }} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}
