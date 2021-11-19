import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ToolsOffcanvas(props) {
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState(false);
    const [demographicCheck, setDemographicCheck] = useState(false);
    const [schoolCheck, setSchoolCheck] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleIncomeSwitch = () => { 
        setChecked(!checked) 
        if (!checked == true){
            props.getIncome();
        } else {
            props.clearIncome();
        }
    };

    const handleDemographicSwitch = () => { 
        setDemographicCheck(!demographicCheck) 
        if (!demographicCheck == true){
            props.getDemographic();
        } else {
            props.clearDemographic();
        }
    };

    const handleSchoolSwitch = () => { 
        setSchoolCheck(!schoolCheck) 
        if (!schoolCheck == true){
            props.getSchool();
        } else {
            props.clearSchool();
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
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
                                checked={checked}
                                onChange={handleIncomeSwitch}
                                type="switch"
                                id="income-switch"
                                label="Income"
                                size="lg"
                                className="form-switch-xl"
                            />
                            <Form.Check
                                onChange={handleSchoolSwitch}
                                type="switch"
                                id="schools-switch"
                                label="Schools"
                                size="lg"
                                className="form-switch-xl"
                            />
                            <Form.Check
                                onChange={handleDemographicSwitch}
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

export default ToolsOffcanvas;