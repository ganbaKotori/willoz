import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Tools
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Tools</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col>
                            <Form.Check
                                type="switch"
                                id="income-switch"
                                label="Income"
                                size="lg"
                                className="form-switch-xl"
                            />
                            <Form.Check
                                type="switch"
                                id="incidents-switch"
                                label="Incidents"
                                size="lg"
                                className="form-switch-xl"
                            />
                            <Form.Check
                                type="switch"
                                id="schools-switch"
                                label="Schools"
                                size="lg"
                                className="form-switch-xl"
                            />
                            <Form.Check
                                type="switch"
                                id="demographic-switch"
                                label="Demographic"
                                size="lg"
                                className="form-switch-xl"
                            />
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Example;