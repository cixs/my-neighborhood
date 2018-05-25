import React, { Component } from "react";
import PropTypes from "prop-types";

class Map extends Component {
  state = {
    markers: [],
    map: {}
  };

  /*
  * @desc create Map object
  * @return - object
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
  * @desc create the array of markers,
  * @params map - google Map object, locations - array of locations
  * @return array
  */
  createMarkers = map => {
    let markers = [];
    const { locations, filter, setActiveLocation } = this.props;
    const google = window.google;

    locations.forEach((location, index) => {
      if (filter === "all" || filter === location.matter) {
        let marker = new google.maps.Marker({
          position: location.coord,
          map: map,
          title: location.name
        });
        marker.index = index;
        marker.addListener("click", function() {
            setActiveLocation(marker.getAnimation()? -1 : marker.index);
        });
        markers.push(marker);
      }
    });
    return markers;
  };
  /*
  * @desc filter the array of markers by hidding/showing them on the map based on filter criteria,
  *       show the active location by setting animation on the corresponding marker
  */
  filterMarkers = () => {
    const { map, markers } = this.state;
    const { locations, filter, activeLocation } = this.props;
    const google = window.google;

    for (let i = 0; i < locations.length; i++) {
      if (filter === "all" || filter === locations[i].matter) {
        if (!markers[i].getMap()) {
          markers[i].setMap(map);
        }
      } else {
        if (markers[i].getMap()) {
          markers[i].setMap(null);
        }
      }
      markers[i].setAnimation(
        activeLocation === i ? google.maps.Animation.BOUNCE : null
      );
    }
  };

  componentDidMount() {
    let map = this.initMap();
    let markers = this.createMarkers(map);
    this.setState({ map: map, markers: markers });
  }

  componentDidUpdate() {
    this.filterMarkers();
  }
  render() {
    return <div id="map" role="application" aria-label="locations on map" />;
  }
}

Map.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeLocation: PropTypes.number,
  setActiveLocation: PropTypes.func.isRequired
};

export default Map;
