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
import HomeCard from './Components/HomeCard';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.ChildElement = React.createRef();
  }
  // Initialize state
  state = { passwords: [], map_data: [], income: [], demographic : [], school: [], map_bounds: null }

  

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
    const childelement = this.ChildElement.current;
    const map_bounds = childelement.getMapBounds();

    let res = await axios.get("https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Demographics/MapServer/12/query?where=1%3D1&outFields=*&geometry=" +
    map_bounds._southWest.lng +
    "," +
    map_bounds._southWest.lat +
    "," +
    map_bounds._northEast.lng +
    "," +
    map_bounds._northEast.lat +
    "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json");
    this.addHouseholdMarkers(res.data.features)

  }

  getDemographic = async () => {
    const childelement = this.ChildElement.current;
    const map_bounds = childelement.getMapBounds();
    let res = await axios.get(
          "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Demographics/MapServer/11/query?where=1%3D1&outFields=*&geometry=" +
          map_bounds._southWest.lng +
          "," +
          map_bounds._southWest.lat +
          "," +
          map_bounds._northEast.lng +
          "," +
          map_bounds._northEast.lat +
          "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json")
    console.log(res)
    this.addDemographicMarkers(res.data.features)
  }

  getSchool = async () => {
    const childelement = this.ChildElement.current;
    const map_bounds = childelement.getMapBounds();
    let res = await axios.get("https://maps.lacity.org/lahub/rest/services/LAUSD_Schools/MapServer/0/query?where=1%3D1&outFields=*&geometry=" +
      map_bounds._southWest.lng +
      "," +
      map_bounds._southWest.lat +
      "," +
      map_bounds._northEast.lng +
      "," +
      map_bounds._northEast.lat + "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json")
    console.log(res.data.features)
    this.addSchoolMarkers(res.data.features)
  }

  clearIncome = () => {
    this.setState({income : []})
  }

  clearDemographic = () => {
    this.setState({demographic : []})
  }

  clearSchool = () => {
    this.setState({school : []})
  }

  addDemographicMarkers(data) {
    let demographicPolygonData = [];
    for (var key in data) {
      var latLngs = data[key].geometry.rings[0];
      let reversedLatLngs = [];
      for (var index in latLngs) {
        reversedLatLngs.push(latLngs[index].reverse());
      }
      let demographicData = data[key].attributes;
      console.log(demographicData)
      demographicPolygonData.push({"position": reversedLatLngs, "data" : demographicData})
    }
    
    this.setState({demographic : demographicPolygonData})
    console.log(this.state.demographic)
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

  addSchoolMarkers(data) {
    var schoolMarkers = []
    for (var key in data) {
      var schoolMarker = {
        "position" : [data[key].geometry.y, data[key].geometry.x]
      }
  
        schoolMarkers.push(schoolMarker);
    }
    this.setState({school : schoolMarkers})
  }
  
  addMenuItem = (map_item) => {
    this.setState(({ map_data }) => ({ map_data: { ...map_data, map_item } }));
  }

  render() {
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
        <Map 
          ref={this.ChildElement} 
          latlngs={[34.152235, -118.043683]} 
          income={this.state.income} 
          school={this.state.school} 
          demographic={this.state.demographic} 
          incidents={[]} />
      </Col>
      <Col xs={12} md={4}>
        <Row className="p-3">
        <Offcanvas 
          getIncome={this.getIncome} 
          clearIncome={this.clearIncome}
          getDemographic={this.getDemographic} 
          clearDemographic={this.clearDemographic}
          getSchool={this.getSchool}
          clearSchool={this.clearSchool}
        />
      </Row>
      <Row>
        {/*<HomeCard 
          homeData={{"address" : '1234 1st street'}}
        />*/}
      </Row>
      </Col>
    </Row>
  </Container>

      </>
    );
  }
}

export default App;