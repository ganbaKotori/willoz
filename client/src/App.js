import React, { Component, createRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Map from './Map';
import Offcanvas from './Offcanvas';
import SearchBar from './Components/SearchBar';
import L from 'leaflet'
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.ChildElement = React.createRef();
  }
  // Initialize state
  state = { passwords: [], map_data: [], income: [], map_bounds: null }

  

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

  getIncome = async () => {
    // const element = this.myRef.current;
    // console.log('LATLNGS FROM MAP TO GETIMCONE', element.state.map)

    const childelement = this.ChildElement.current;
    const map_bounds = childelement.getMapBounds()
    console.log("bounnds from ref functions",JSON.stringify(childelement.getMapBounds()))

    let res = await axios.get("https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Demographics/MapServer/12/query?where=1%3D1&outFields=*&geometry=" +
    map_bounds._southWest.lng +
    "," +
    map_bounds._southWest.lat +
    "," +
    map_bounds._northEast.lng +
    "," +
    map_bounds._northEast.lat +
    "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json");

    let data = res.data;
    this.addHouseholdMarkers(data.features)
        // $.ajax({
        //   url:
        // "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Demographics/MapServer/12/query?where=1%3D1&outFields=*&geometry=" +
        // map_bounds._southWest.lng +
        // "," +
        // map_bounds._southWest.lat +
        // "," +
        // map_bounds._northEast.lng +
        // "," +
        // map_bounds._northEast.lat +
        // "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json",
        //   type: "GET",
        //   data: {},
        // }).done(function (data) {
        //   console.log(data);
        // });
  }

  clearIncome = () => {
    this.setState({income : []})
  }

  addHouseholdMarkers(data) {
    let income_polygons = []
    for (var key in data) {
      var count = 0;
      var sum = 0;
  
      const incomes = (({
        B19013Ae1,
        B19013Be1,
        B19013Ce1,
        B19013De1,
        B19013Ee1,
        B19013Fe1,
        B19013Ge1,
        B19013He1,
        B19013Ie1,
        B19013e1,
      }) => ({
        B19013Ae1,
        B19013Be1,
        B19013Ce1,
        B19013De1,
        B19013Ee1,
        B19013Fe1,
        B19013Ge1,
        B19013He1,
        B19013Ie1,
        B19013e1,
      }))(data[key].attributes);
  
      //console.log(incomes)
      for (const [key, value] of Object.entries(incomes)) {
        //console.log(`${key}: ${value}`);
        if (value != 0) {
          count += 1;
          sum += value;
        }
      }
      // console.log(count);
      // console.log(sum);
      let average = sum / count;
  
      var color;
      if (average > 120000) {
        color = "purple";
      } else if (average > 100000) {
        color = "green";
      } else if (average > 50000) {
        color = "yellow";
      } else if (average > 30000) {
        color = "orange";
      } else if (Number.isNaN(average)) {
        color = "gray";
      } else color = "red";
  
      var latLngs = data[key].geometry.rings[0];
      let reversedLatLngs = [];
      for (var index in latLngs) {
        reversedLatLngs.push(latLngs[index].reverse());
      }

      income_polygons.push({"position" : reversedLatLngs, "color" : color, "average" : average})
    }
    this.setState({income : income_polygons})
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
        <Map ref={this.ChildElement} latlngs={[34.152235, -118.043683]} income={this.state.income} school={[]} demographic={[]} incidents={[]} />
      </Col>
      <Col xs={12} md={4}>
        <Row className="p-3">
        <Offcanvas addMenuItem={this.addMenuItem} getIncome={this.getIncome} clearIncome={this.clearIncome}/>
      </Row>
      </Col>
    </Row>
  </Container>

      </>
    );
  }
}

export default App;