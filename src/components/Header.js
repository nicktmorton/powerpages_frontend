import { useState } from "react";
import {
    Nav
} from "react-bootstrap";

export default function Header() {

    const [active, setActive] = useState("");

    return (
        <Nav
        activeKey={active}
        className="bg-light text-light mb-4"
        onSelect={(selected) => setActive(selected)}
        >
            <Nav.Item>
                <Nav.Link href="/home">New Residential Single Family</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/lease">Lease</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/price">Price Changes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/status">Status Changes</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}