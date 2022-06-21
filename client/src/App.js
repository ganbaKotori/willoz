import React, { Component, createRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Map from './Components/Map';
import Offcanvas from './Offcanvas';
import SearchBar from './Components/SearchBar';
import SideBar from './Components/Sidebar';
import PlaceFinder from './Components/PlaceFinder';
import Modal from 'react-bootstrap/Modal';
import {FaLocationArrow} from 'react-icons/fa';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.ChildElement = React.createRef();
    this.handler = this.handler.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleLocateMe = this.handleLocateMe.bind(this);
  }

  state = { zoom: 10, 
            geoLocation: {}, 
            searchResults: [], 
            passwords: [], 
            map_data: [], 
            income: [], 
            demographic : [], 
            school: [], 
            map_bounds: null, 
            center: [34.0522, -118.2437],
            houses: [],
            apartments: [],
            showModal: false,
          }

  handler(center) {
    this.setState({
      center: center,
      zoom: 17
    })
  }

  handleModalClose(){
    this.setState({
      showModal: false
    })
  }

  handleModalShow(){
    this.setState({
      showModal: true
    })
  }

  handleLocateMe()
  {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log("e", e)
      this.setState({ 
        geoLocation: e.coords
      });
      this.setState({
        center: [e.coords.latitude, e.coords.longitude],
        zoom: 17
      })
    }, async (err) => {
      this.setState({
        geoError: err
      });
    });
  }



  // Fetch passwords after first mount
  componentDidMount() {

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
  
      for (const [key, value] of Object.entries(incomes)) {
        //console.log(`${key}: ${value}`);
        if (value != 0) {
          count += 1;
          sum += value;
        }
      }
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

  setPlace(key) {
    let place = this.state.searchResults.find((p) => p.id === key);
    this.setState({
      selectedPlace: place
    })
  }
  
  async onSearchChange(query) {
    if (query.length > 0) {
      let placeFinder = new PlaceFinder('mG11ZnzuVENJeDG4KLkn6QnNFA3Sx5RZ');
      let results = (await placeFinder.getNearbyPlaces(query, this.state.geoLocation.latitude, this.state.geoLocation.longitude));
      this.setState({
        searchResults: results
      });
    }
  }

  render() {
    return (
      <>
            <Modal
        show={this.state.showModal}
        onHide={this.handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>About Willoz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Willoz is a personal project created by Alexander Ramirez. This website follows concepts from Zillow.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Wolliz</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="https://www.github.com/ganbaKotori/willoz" target={"_blank"}>GitHub</Nav.Link>
      <Nav.Link onClick={this.handleModalShow}>About</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <Container
    fluid
  >
    <Row>
      <Col xs={12} md={8} >
        <Row>
          <Col xs={6} md={8}>
          <SearchBar handler = {this.handler}/>
          </Col >
          <Col xs={6} md={4} className="py-2">
            <Button variant="primary" onClick={this.handleLocateMe}><FaLocationArrow className="mb-1"/>{' '}Locate Me </Button>{' '}
            <Offcanvas 
            getIncome={this.getIncome} 
            clearIncome={this.clearIncome}
            getDemographic={this.getDemographic} 
            clearDemographic={this.clearDemographic}
            getSchool={this.getSchool}
            clearSchool={this.clearSchool}
          />
          </Col>
        </Row>
        <Row>
          <Col className="p-0 m-0">
          <Map 
            zoom={this.state.zoom}
            key={this.state.center}
            ref={this.ChildElement} 
            latlngs={this.state.center} 
            income={this.state.income} 
            school={this.state.school} 
            demographic={this.state.demographic} 
            incidents={[]}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={4} >
        <SideBar handler = {this.handler} houses={this.state.houses} apartments={this.state.apartments}/>
      </Col>
    </Row>
  </Container>
      </>
    );
  }
}
export default App;