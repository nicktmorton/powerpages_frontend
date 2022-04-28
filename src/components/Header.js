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
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}