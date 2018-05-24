import React, { Component } from "react";
import PropTypes from "prop-types";

class Map extends Component {
  state = { markers: [] };
  /*
  * @desc create a Google Map object
  * @return a Map object
  */
  initMap = () => {
    let loc = {
      lat: 45.773039,
      lng: 24.129186
    };
    const google = window.google;
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: loc,
      scrollwheel: true
    });
    return map;
  };

  /*
  * @desc create an array of markers,
  * @params map - google Map object, locations - array of locations
  * @return array
  */
  createMarkers = (map, locations) => {
    let markers = [];
    const google = window.google;

    this.props.locations.forEach(location => {
      let marker = new google.maps.Marker({
        position: location.coord,
        map: map,
        title: location.name
      });
      marker.addListener("click", function() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      });
      markers.push(marker);
    });
    return markers;
  };

  componentDidMount() {
    let map = this.initMap();
    let markers = this.createMarkers(map, this.props.locations);
    this.setState({ markers });
  }

  render() {
    return <div id="map" role="application" aria-label="locations on map" />;
  }
}

Map.propTypes = {
  locations: PropTypes.array.isRequired
};

export default Map;
