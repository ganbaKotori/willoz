import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import Card from 'react-bootstrap/Card';

function ApartmentCard(props) {
    return (
        <Card>
  <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17d6fb979d8%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17d6fb979d8%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.1328125%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
  <Card.Body>
    <Card.Title>{props.apartmentData.address}</Card.Title>
    <Card.Text>
    <h3>${props.apartmentData.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/month</h3>
    {props.apartmentData.city}, {props.apartmentData.state} {props.apartmentData.zip}
    </Card.Text>
    <Button variant="primary">Locate On Map</Button>
  </Card.Body>
</Card>
    );
}

export default ApartmentCard;