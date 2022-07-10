import { useState } from "react";
import { useSelector } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

export default function Header() {

    const [active, setActive] = useState("");

    const {user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        window.location.reload(false);
    }

    return (
        <div>
            <Nav
            activeKey={active}
            className="bg-light text-light"
            onSelect={(selected) => setActive(selected)}
            >
                <div className="d-flex justify-content-between">
                    <>
                        <Nav.Item>
                            <Nav.Link href="/home">New Residential Sale</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/lease">New Residential Lease</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/price">Price Changes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/status">Status Changes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/cma">CMA</Nav.Link>
                        </Nav.Item>
                    </>
                    <div className="float-end">
                        {user.level <= 2 && (
                            <Nav.Item className="float-start">
                                <Nav.Link href="/account">Account</Nav.Link>
                            </Nav.Item>
                        )}
                        {user.level === 1 && (
                            <Nav.Item className="float-start">
                                <Nav.Link href="/admin">Admin</Nav.Link>
                            </Nav.Item>
                        )}
                        <Nav.Item className="float-start">
                            <Nav.Link href="https://macromodus.com/powerpage/powerpage_help.html" target="_blank">Help</Nav.Link>
                        </Nav.Item>
                        <Button className="float-end" variant="link" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOut} />
                            <span className="mx-2">Logout</span>
                        </Button>
                    </div>
                </div>
            </Nav>
            {user.logo && <img src={user.logo} height={50} /> }
        </div>
    )
}