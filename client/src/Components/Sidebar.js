import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HouseCard from './HouseCard';
import ApartmentCard from './ApartmentCard';
import '../App.css';
const axios = require("axios")

class SideBar extends Component {
	state = {
		houses: [],
		apartments : [],
	  }

	componentDidMount() {
		axios.get(`/api/apartments`)
		  .then(res => {
			console.log(res.data)
			const apartments = res.data;
			this.setState({ apartments });
		  })
		axios.get(`/api/houses`)
		  .then(res => {
			console.log(res.data)
			const houses = res.data;
			this.setState({ houses });
		  })
	}


	render() {
		return (
			<Row className="p-3">
				<Tabs defaultActiveKey="buy" id="uncontrolled-tab-example" className="mb-3">
					<Tab eventKey="buy" title="Buy" className="sidebar-tab">
						{this.state.houses.map((house, idx) => (
							<HouseCard houseData={house} handler={this.props.handler} />
						))}
					</Tab>
					<Tab eventKey="rent" title="Rent" className="sidebar-tab">
						{this.state.apartments.map((apartment, idx) => (
							<ApartmentCard apartmentData={apartment} handler={this.props.handler} />
						))}
					</Tab>
					{/* <Tab eventKey="sell" title="Sell">
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Street Address</Form.Label>
								<Form.Control type="email" placeholder="Enter street address" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control type="email" placeholder="Enter phone number" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Allow us to call you" />
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Tab> */}
				</Tabs>
			</Row>
		);
	}
}

export default SideBar;
