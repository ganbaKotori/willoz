import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Map from './Map';
import Form from 'react-bootstrap/Form';
import Offcanvas from './Offcanvas';

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
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
      <Col xs={12} md={8} className="p-0 m-0">
      <Map />
      </Col>
      <Col xs={12} md={4}>
      <Row className="p-3">
      <Offcanvas/>
    </Row>
      </Col>
    </Row>
  </Container>

      </>
    );
  }
}

export default App;