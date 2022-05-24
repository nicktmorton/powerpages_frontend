import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";

import Info from "../../components/auth/Forms/Info";

export default function Register({ setPage }) {

    return (
        <Container>
            <Row>
                <Col med={12} lg={6} className="d-block mx-auto mt-4">
                    <Card>
                        <Card.Header>
                            PowerPages - Register
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Info />
                            </Form>
                            <Button variant="link" size="sm" className="mt-3" onClick={setPage}>Login</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}