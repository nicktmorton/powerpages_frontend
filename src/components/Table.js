import {
    Table as BSTable
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

export default function Table({ header, subheader, variant, mapping, listings }) {

    const titles = [];
    const masks = [];
    const sorts = [];
    const links = [];
    const timestamps = [];
    const prices = [];
    const numbers = [];

    const getMaskedListing = (listing) => {
        const final = [];
        masks.forEach((element,index) => {
            if(element === null) {
                final.push(null);
                return;
            }
            if(typeof element == 'string') {
                final.push(listing[element]);
                return;
            }
            if(Array.isArray(element)) {
                const temp = []
                element.forEach(field => {
                    temp.push(listing[field]);
                });
                final.push(temp.join(mapping[index]['delimiter']));
                return;
            }
            final.push(null);
        });
        return final;
    }

    mapping.forEach(m => {
        titles.push(m["title"]);
        masks.push(m["mask"]);
        sorts.push("sortable" in m && m["sortable"] ? true : false);
        links.push("link" in m ? m["link"] : null);
        timestamps.push("timestamp" in m && m["timestamp"] ? true : false);
        prices.push("price" in m && m["price"] ? true : false);
        numbers.push("number" in m && m["number"] ? true : false);
    });

    return (
        <BSTable size="sm" bordered hover>
            <thead>
                <tr>
                    <td colSpan={titles.length} className={`bg-${variant} text-light text-center`}>{header}</td>
                </tr>
                <tr style={{backgroundColor: '#F0F0F0'}}>
                    {titles && titles.map((t,tindex) => (
                        <td className="fw-normal" key={tindex}>{t}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listings && listings.map((v,vindex) => {
                    const masked = getMaskedListing(v);
                    return (<tr style={{backgroundColor: '#FFFFFF'}} key={vindex}>
                        {masked.map((col,index) => (
                            <td className={(index === 0 && col===null) ? "text-center" : ""} key={`${vindex}_${index}`}>
                                {index === 0 && col === null 
                                ? 
                                <input type="checkbox"/> 
                                : 
                                (links[index] 
                                ? 
                                <Link to={`${links[index]["path"]}${v[links[index]["mask"]]}`}>{col}</Link> 
                                : 
                                (timestamps[index]
                                ?
                                moment(col).format("MM-DD h:mm:ss a")
                                :
                                (prices[index]
                                ?
                                col.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
                                :
                                (numbers[index]
                                ?
                                col.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                                :
                                col
                                )
                                )
                                )
                                )
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