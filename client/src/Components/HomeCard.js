import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import Card from 'react-bootstrap/Card';

function HomeCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>{props.homeData.address}</Card.Title>
    <Card.Text>

      This house is for sale
    </Card.Text>
    <Button variant="primary">View</Button>
  </Card.Body>
</Card>
    );
}

export default HomeCard;