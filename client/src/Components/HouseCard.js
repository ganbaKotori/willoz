import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

function HouseCard(props) {
	return (
		<Card>
			<Carousel>
				{props.houseData.images.map((image, idx) => (
					<Carousel.Item>
						<Image src={image} fluid />
					</Carousel.Item>
				))}
			</Carousel>
			{/* <Card.Img variant="top" src={props.houseData.images[0]}/> */}
			<Card.Body>
				<Card.Title>{props.houseData.address}</Card.Title>
				<h3>${props.houseData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
				<Card.Text>
					{props.houseData.city}, {props.houseData.state} {props.houseData.zip}
				</Card.Text>
				<Button variant="primary" onClick={() => props.handler(props.houseData.latlon)}>
					Locate On Map
				</Button>
			</Card.Body>
		</Card>
	);
}

export default HouseCard;
