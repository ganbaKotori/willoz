import React, { Component, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Map from './Map';
import Form from 'react-bootstrap/Form';
import Offcanvas from './Offcanvas';
import SearchBar from './Components/SearchBar';

class App extends Component {
  // Initialize state
  state = { passwords: [], map_data: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
      navigator.geolocation.getCurrentPosition((e) => {
    this.setState({ 
      geoLocation: e.coords
    });
  }, async (err) => {
    this.setState({
      geoError: err
    });
  });
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  addMenuItem = (map_item) => {
    this.setState(({ map_data }) => ({ map_data: { ...map_data, map_item } }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Wolliz</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Buy</Nav.Link>
      <Nav.Link href="#features">Rent</Nav.Link>
      <Nav.Link href="#pricing">Sell</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <Container
    fluid
    className="body-container"
  >
    <Row>
      <Col>
        <SearchBar/>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={8} className="p-0 m-0">
      <Map latlngs={[34.152235, -118.043683]}/>
      </Col>
      <Col xs={12} md={4}>
      <Row className="p-3">
      <Offcanvas addMenuItem={this.addMenuItem}/>
    </Row>
      </Col>
    </Row>
  </Container>

      </>
    );
  }
}

export default App;