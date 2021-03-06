import {
    Table as BSTable,
    Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faArrowsUpDown, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const initialWatchList = JSON.parse(window.localStorage.getItem('POWERPAGES_WATCH_LIST'));

const compareStrings = (x,y) => { return x.toLowerCase().localeCompare(y.toLowerCase()) }
const compareInts = (x,y) => { return x - y }

const sortListings = (listings, sortAsc, sortKey, sortType) => {
    if(sortKey === "") {
        return listings;
    }
    let temp = listings;
    if(sortAsc) {
        if(sortType === "int") {
            temp.sort((a,b) => compareInts(a[sortKey],b[sortKey]));
        } else {
            temp.sort((a,b) => compareStrings(a[sortKey],b[sortKey]));
        }
    } else {
        if(sortType === "int") {
            temp.sort((a,b) => compareInts(b[sortKey],a[sortKey]));
        } else {
            temp.sort((a,b) => compareStrings(b[sortKey],a[sortKey]));
        }
    }
    return temp;
}

export default function Table({ header, variant, mapping, listings }) {

    const [sortCol, setSortCol] = useState(999);
    const [sortType, setSortType] = useState("string");
    const [sortKey, setSortKey] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [watchList, setWatchList] = useState(initialWatchList || []);

    const getMaskedListing = (listing) => {
        const final = [];
        mapping.forEach((element) => {
            const mask = element["mask"];
            if(mask === null) {
                final.push(null);
                return;
            }
            const isArray = Array.isArray(mask);
            const type = typeof mask;
            let value = null;
            if(!isArray && type !== "string") {
                final.push(null);
                return;
            }
            if(isArray) {
                const temp = [];
                mask.forEach(field => {
                    temp.push(listing[field]);
                });
                value = temp;
            } else {
                value = listing[mask];
            }
            final.push(formatCol(listing, element, value, isArray));
        });
        return final;
    }

    const formatCol = (listing, element, value, isArray) => {
        if("link" in element) {
            if(isArray) {
                return <Link to={`${element["link"]["path"]}${listing[element["link"]["mask"]]}`}>{value.join(element["delimiter"])}</Link>  
            }
            return <Link to={`${element["link"]["path"]}${listing[element["link"]["mask"]]}`}>{value}</Link>  
        }
        if("timestamp" in element) {
            //return moment(value).format("MM-DD h:mm:ss a")
            return moment(value).format("h:mm:ss a")
        }
        if("price" in element) {
            if(isArray) {
                return value.map(v => {
                    if(!v) {
                        return '';
                    }
                    return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
                }).join(element["delimiter"]);
            }
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        }
        if("number" in element) {
            if(isArray) {
                return value.map(v => {
                    return v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                }).join(element["delimiter"]);
            }
            return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        }
        if("exclude" in element) {
            if(value == element["exclude"]) {
                return null;
            } 
        }
        if(isArray) {
            return value.join(element["delimiter"]);
        }
        return value;
    }

    const handleSortChange = (index,key,type) => {
        if(index === sortCol) {
            setSortAsc(!sortAsc);
        } else {
            setSortCol(index);
            setSortType(type);
            setSortKey(key);
            setSortAsc(true);
        }
    }

    const sorted = useMemo(() => {
        return sortListings(listings, sortAsc, sortKey, sortType);
    },[listings, sortKey, sortAsc, sortType]);

    /*
    const siftListings = async (blended, list) => {
        const watched = [];
        const unwatched = [];
        blended.forEach((b) => {
            if(list.includes(b["listingId"])) {
                watched.push(b);
            } else {
                unwatched.push(b);
            }
        });
        return watched.concat(unwatched);
    }
    */

    const toggleWatch = (listingId,add=true) => {
        const curr = watchList || [];
        let newest = [];
        if(add) {
            newest = curr;
            newest.push(listingId);
        } else {
            newest = curr.filter(w => w !== listingId);
        }
        setWatchList(newest);
        localStorage.setItem('POWERPAGES_WATCH_LIST',JSON.stringify(newest));
        window.location.reload();
    }

    return (
        <BSTable size="sm" bordered hover>
            <thead>
                <tr>
                    <td colSpan={mapping.length} className={`bg-${variant} text-light text-center`}>{header}</td>
                </tr>
                <tr style={{backgroundColor: '#F0F0F0'}}>
                    {mapping.map((t,tindex) => (
                        <td className="fw-normal" key={tindex}>
                            <span>
                                <b>{t["title"]}</b>
                                {t["sortable"] && 
                                    <FontAwesomeIcon 
                                    icon={sortCol === tindex ? (sortAsc ? faArrowUp : faArrowDown) : faArrowsUpDown} 
                                    className={`mx-2 ${sortCol === tindex ? 'text-primary' : ''}`} 
                                    onClick={() => handleSortChange(tindex,t["mask"],t["sort_type"])}/>
                                }
                            </span>
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sorted && sorted.map((v,vindex) => {
                    const masked = getMaskedListing(v);
                    return (<tr style={{backgroundColor: '#FFFFFF'}} key={vindex}>
                        {masked.map((col,index) => (
                            <td className={(index === 0 && col===null) ? "text-center" : ""} key={`${vindex}_${index}`} style={{ whiteSpace: 'pre' }}>
                                {index === 0 && col === null 
                                ?
                                (
                                    watchList.includes(v["listingId"]) 
                                    ?
                                    <Button onClick={() => toggleWatch(v["listingId"],false)} size="sm" className="bg-light text-danger">
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </Button>
                                    :
                                    <Button onClick={() => toggleWatch(v["listingId"])} size="sm" variant="link" className="bg-light text-success">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                )
                                :
                                col
                                }
                            </td>
                        ))}
                        </tr>
                    )
                })}
            </tbody>
        </BSTable>
    )
}