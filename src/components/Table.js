import {
    Table as BSTable
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";

export default function Table({ header, variant, mapping, listings }) {

    const [sortCol, setSortCol] = useState(999);
    const [sortAsc, setSortAsc] = useState(true);
    const [sorted, setSorted] = useState(listings);

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
            return moment(value).format("MM-DD h:mm:ss a")
        }
        if("price" in element) {
            if(isArray) {
                return value.map(v => {
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
        if(isArray) {
            return value.join(element["delimiter"]);
        }
        return value;
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
                                {t["title"]}
                                {t["sortable"] && 
                                    <FontAwesomeIcon 
                                    icon={faArrowsUpDown} 
                                    className={`mx-2 ${sortCol === tindex ? 'text-primary' : ''}`} 
                                    onClick={() => setSortCol(tindex)}/>
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
                            <td className={(index === 0 && col===null) ? "text-center" : ""} key={`${vindex}_${index}`}>
                                {index === 0 && col === null 
                                ? 
                                <input type="checkbox" /> 
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