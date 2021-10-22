import React, { Component } from 'react';

class SearchBar extends Component {
  state = { passwords: [], geoLocation : "", geoError: "" }

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

  render() {
    const { geoLocation, geoError } = this.state;


      if (geoError) {
          return <p className="banner warn">{geoError.message}</p>;
      } else if (geoLocation.latitude) {
      return <p className="banner success">
          Lat: <strong>{geoLocation.latitude.toFixed(4)}</strong>, 
          Long: <strong>{geoLocation.longitude.toFixed(4)}</strong>
      </p>;
      } else {
          return null
      }
 
  }
}

export default SearchBar;