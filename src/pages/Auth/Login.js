import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";

import Credentials from "../../components/auth/Forms/Credentials";

export default function Login({ setPage }) {

    return (
        <Container>
            <Row>
                <Col med={12} lg={6} className="d-block mx-auto mt-4">
                    <Card>
                        <Card.Header>
                            PowerPages - Login
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                {<Credentials />}
                            </Form>
                            <Button variant="link" size="sm" className="mt-3" onClick={setPage}>Register New Account</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}
