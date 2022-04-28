import {
    Table as BSTable
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Table({ header, subheader, variant, keys, values, linkColumn = 0 }) {
    return (
        <BSTable size="sm" bordered hover>
            <thead>
                <tr>
                    <td colSpan={keys.length} className={`bg-${variant} text-light text-center`}>{header}</td>
                </tr>
                <tr>
                    <td colSpan={keys.length} className={`bg-${variant} text-light text-center`}>{subheader}</td>
                </tr>
                <tr style={{backgroundColor: '#F0F0F0'}}>
                    {keys && keys.map(k => (
                        <td className="fw-normal">{k}</td>
                    ))}
                </tr>
                {values && values.map(v => (
                    <tr style={{backgroundColor: '#FFFFFF'}}>
                    {v.map((td,index) => (
                        <td className={index === 0 && td===null && "text-center"}>
                            {index === 0 && td === null 
                            ? 
                            <input type="checkbox"/> 
                            : 
                            (index === linkColumn ? <Link to={`/listing/${td}`}>{td}</Link> : td)
                            }
                        </td>
                    ))}
                    </tr>
                ))}
            </thead>
        </BSTable>
    )
}