import { useEffect, useState } from "react";
import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";

import Code from "../../components/auth/Forms/Code";
import Info from "../../components/auth/Forms/Info";

export default function Register({ setPage }) {

    const [step, setStep] = useState(0);

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
                                {step == 0 && <Code setStep={() => setStep(1)}/>}
                                {step == 1 && <Info />}
                            </Form>
                            <Button variant="link" size="sm" className="mt-3" onClick={setPage}>Login</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}