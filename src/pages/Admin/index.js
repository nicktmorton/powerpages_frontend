import { useState, useEffect, useRef } from "react";
import { Card, Form, Container, Row, Col, Button, Table, Tab, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Account() {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const {user, isLoading} = useSelector((state) => state.auth);

    const getUsers = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/admin/getUsers`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        });
    }

    const validateUser = async (id) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/admin/validateUser/${id}`,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then(res => {
            window.location.reload();
        });
    }

    useEffect(() => {
        async function fetchData() {
            await getUsers();
            setLoading(false);
        }
        fetchData();
    },[]);

    if(isLoading || loading) return <Spinner animation="border" variant="light" size="sm"/>

    return (
        <Container>
            <Row>
                <Col med={12} lg={8} className="d-block mx-auto mt-4">
                    <Card>
                        <Card.Header>
                            Admin Center
                        </Card.Header>
                        <Card.Body>
                            <Table striped={false} bordered={false}>
                                <thead>
                                    <th>Email</th>
                                    <th>License #</th>
                                    <th>Verified</th>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr>
                                            <td>{u.email}</td>
                                            <td>{u.username}</td>
                                            <td>{u.verified 
                                            ? 
                                            "Verified" 
                                            : 
                                            <Button variant="link" size="sm" onClick={() => validateUser(u["id"])}>Verify</Button>
                                            }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}