import { useState, useEffect, useRef } from "react";
import { Card, Form, Container, Row, Col, Button, Table, Tab, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { logout, reset, refresh } from "../../features/auth/authSlice";

export default function Account() {

    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [codes, setCodes] = useState(["","","",""]);
    const [saving, setSaving] = useState(false);

    const fileRef = useRef();

    const {user, isLoading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleCodeChange = (index, value) => {
        const newArr = [...codes];
        newArr[index] = value;
        setCodes(newArr);
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        updateUserLogo(event.target.files[0]);
        dispatch(refresh({ token: user.token }));
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        window.location.reload(false);
    }

    const updateUserLogo = async (newFile) => {
        if(!newFile) {
            return;
        }
        const formData = new FormData();
        formData.append('file',newFile);
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/user/updateLogo`,{
            method: 'post',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${user.token}`
            },
            body: formData
        }).then(res => res.json());
        console.log("Logo upload response: ",result);
        fileRef.current.value = '';
    }

    const saveClientCodes = async () => {
        setSaving(true);
        const formattedCodes = codes.map((c) => `${user.username}-${c}`);
        await fetch(`${process.env.REACT_APP_API_URL}/api/user/saveClientCodes`,{
            method: 'post',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ codes: formattedCodes })
        }).then(setSaving(false));
    }

    const getClientCodes = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/user/getClientCodes`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const unformattedCodes = data.map((c) => c.replace(`${user.username}-`,''));
            setCodes(unformattedCodes);
        });
    }

    useEffect(() => {
        async function fetchData() {
            await getClientCodes();
            setLoading(false);
        }
        fetchData();
        if(!isLoading && user) {
            dispatch(refresh({ token: user.token }));
        }
    },[]);

    if(isLoading || loading) return <Spinner animation="border" variant="light" size="sm"/>

    return (
        <Container>
            <Row>
                <Col med={12} lg={8} className="d-block mx-auto mt-4">
                    <Card>
                        <Card.Header>
                            Account Details
                        </Card.Header>
                        <Card.Body>
                            <img 
                            src={file ? URL.createObjectURL(file) : (user.logo ? user.logo : `${process.env.PUBLIC_URL}/logo-upload-file-png.png`)} 
                            alt="logo" 
                            height={200} 
                            width={200} 
                            />
                            <Table striped={false} bordered={false}>
                                <tbody>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Agent License #:</td>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Verified:</td>
                                        <td>{user.verified ? 'True' : 'False'}</td>
                                    </tr>
                                    <tr>
                                        <td>Logo:</td>
                                        <td><input type="file" accept="image/*" ref={fileRef} onChange={handleFileChange}/></td>
                                    </tr>
                                </tbody>
                            </Table>
                            {user.verified === 1 && (
                                <div className="mt-4">
                                    <h4>Client Login Codes</h4>
                                    <small className="text-danger my-2">I affirm and understand I will not supply my Primary agent login 
                                    information to any other person. Access to certain data is a srrict violation MLS and PowerPage 
                                    terms and conditions. Any viloation will result in your account being immediately revoked and will 
                                    not be reinstated. No refunds.</small>
                                    <Table className="mt-4">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    1) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(0,event.target.value)} value={codes[0]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    2) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(1,event.target.value)} value={codes[1]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    3) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(2,event.target.value)} value={codes[2]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    4) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(3,event.target.value)} value={codes[3]} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button variant="primary" size="sm" className="mt-3" disabled={saving} onClick={saveClientCodes}>
                                        {saving ? <Spinner animation="border" variant="light" size="sm"/> : "Save"}
                                    </Button>
                                </div>
                            )}
                            {!user.verified && <a href="https://macromodus.com/powerpage/payment.html" target="_blank" rel="noreferrer">Payment</a>}
                            {!user.verified && (
                                <Button variant="link" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOut} />
                                    <span className="mx-2">Logout</span>
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}