import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Place from './Place';
import PlaceFinder from './PlaceFinder';
import ReactSearchBox from 'react-search-box';
class SearchBar extends Component {
  state = { passwords: [], 
            geoLocation : "",
            geoError: "", 
            searchResults: [],
          }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e.coords)
      this.setState({ 
        geoLocation: e.coords
      });
    }, async (err) => {
      console.log(err)
      this.setState({
        geoError: err
      });
    });
  }

  async onSearchChange(query) {
    if (query.length > 3) {
      let placeFinder = new PlaceFinder('mG11ZnzuVENJeDG4KLkn6QnNFA3Sx5RZ');
      let results = (await placeFinder.getNearbyPlaces(query, this.state.geoLocation.latitude, this.state.geoLocation.longitude));
      //console.log(results)
      this.setState({
        searchResults: results
      });
      console.log(this.state.searchResults)
    }
  }

  setPlace(key) {
    console.log(key)
    let place = this.state.searchResults.find((p) => p.id === key);
    this.setState({
      selectedPlace: place
    })
    console.log(place.position.lat)
    console.log(place.position.lon)
    this.props.handler([place.position.lat,place.position.lon])
  }

  render() {
    const { geoLocation, geoError } = this.state;


      if (geoError) {
          return <p className="banner warn">{geoError.message}</p>;
      } else if (geoLocation.latitude) {
      return(
        <>
        <p className="banner success d-none">
            Lat: <strong>{geoLocation.latitude.toFixed(4)}</strong>, 
            Long: <strong>{geoLocation.longitude.toFixed(4)}</strong>
        </p>
        <Row>
        <Col>
        <Place
            className="place-box d-none"
            data={this.state.selectedPlace}>
        </Place>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
        <ReactSearchBox
          placeholder="Search for nearby places"
          matchedRecords={this.state.searchResults
            .map(result => ({
              key: result.id,
              dist: result.dist,
              value: `${result.address.freeformAddress} | ${(result.dist / 1000).toFixed(2)}km `
            }))
            .sort((a, b) => a.dist - b.dist)
          }
          data={this.state.searchResults
            .map(result => ({
              key: result.id,
              dist: result.dist,
              value: result.address.freeformAddress
            }))
            .sort((a, b) => a.dist - b.dist)
          }
          onSelect={(place) => {console.log(place.item.key);this.setPlace(place.item.key)}}
          autoFocus={true}
          onChange={(query) => this.onSearchChange(query)}
          fuseConfigs={{
            minMatchCharLength: 3,
            threshold: 1,
            distance: 100000,
            sort: false
          }}
          keys = {['name']}
        />
        </Col>
      </Row>

        </>
        
      )
;
      } else {
          return null
      }
 
  }
}

export default SearchBar;