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
        //const formattedCodes = codes.map((c) => `${user.username}-${c}`);
        await fetch(`${process.env.REACT_APP_API_URL}/api/user/saveClientCodes`,{
            method: 'post',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ codes: codes })
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
                            height={100} 
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
				    <tr>
				        <td>Adding a logo is not required, however, if you wish to have your logo at the top of the PowerPage as a marketing touch,
					simply upload the logo. <br /><br />IMPORTANT: be careful not to add a logo that is to tall (or high) as this will 
					push the data further down the page which makes mobile screen viewing a bit more crowded.
					</td>
				    </tr>
                                </tbody>
                            </Table>
                            {user.verified === 1 && (
                                <div className="mt-4">
                                    <h4 id="cc">Client Login Codes</h4>
                                    Please use the following fields to activate accounts for your clients. Simply enter their name or whatever username
				    you want to provide them that they should not forget - they will use this alone to access the Powerpage.  Simply enter a new ID whenever you want to 
				    provide the PowerPage to someone else. If you want to stop access for a user, just replace their current username with a new one.
				    <br /><br />
				    Please let your clients know that If an ID is shared, whoever is logged in at that moment will be logged out of the PowerPage. Let your clients know it is clearly best to keep their ID private.
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
                                                                                        
                                            <tr>
                                                <td>
                                                    5) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(4,event.target.value)} value={codes[4]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    6) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(5,event.target.value)} value={codes[5]} />
                                                </td>
                                            </tr>
											<tr>
                                                <td>
                                                    7) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(6,event.target.value)} value={codes[6]} />
                                                </td>
                                            </tr>
											<tr>
                                                <td>
                                                    8) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(7,event.target.value)} value={codes[7]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    9) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(8,event.target.value)} value={codes[8]} />
                                                </td>
                                            </tr>
                                              <tr>
                                                <td>
                                                    10) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(9,event.target.value)} value={codes[9]} />
                                                </td>
                                            </tr>
                                               <tr>
                                                <td>
                                                    11) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(10,event.target.value)} value={codes[10]} />
                                                </td>
                                            </tr>
                                               <tr>
                                                 <td>
                                                    12) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(11,event.target.value)} value={codes[11]} />
                                                </td>
                                            </tr>
                                             <tr>
                                                 <td>
                                                    13) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(12,event.target.value)} value={codes[12]} />
                                                </td>
                                            </tr>
                                             <tr>
                                                 <td>
                                                    14) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(13,event.target.value)} value={codes[13]} />
                                                </td>
                                            </tr>
                                             <tr>
                                                 <td>
                                                    15) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(14,event.target.value)} value={codes[14]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td>
                                                    16) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(15,event.target.value)} value={codes[15]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td>
                                                    17) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(16,event.target.value)} value={codes[16]} />
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td>
                                                    18) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(17,event.target.value)} value={codes[17]} />
                                                </td>
                                            </tr>
                                             <tr>
                                                 <td>
                                                    19) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(18,event.target.value)} value={codes[18]} />
                                                </td>
                                            </tr>
                                              <tr>
                                                 <td>
                                                    20) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(19,event.target.value)} value={codes[19]} />
                                                </td>
                                            </tr>
                                             <tr>
                                                 <td>
                                                    21) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(20,event.target.value)} value={codes[20]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    22) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(21,event.target.value)} value={codes[21]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    23) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(22,event.target.value)} value={codes[22]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    24) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(23,event.target.value)} value={codes[23]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    25) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(24,event.target.value)} value={codes[24]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    26) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(25,event.target.value)} value={codes[25]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    27) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(26,event.target.value)} value={codes[26]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    28) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(27,event.target.value)} value={codes[27]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    29) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(28,event.target.value)} value={codes[28]} />
                                                </td>
                                            </tr>
                                                                                         <tr>
                                                 <td>
                                                    30) {`${user.username}-`}
                                                    <input type="text" onChange={(event) => handleCodeChange(29,event.target.value)} value={codes[29]} />
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
