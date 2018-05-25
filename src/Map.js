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
  createMarkers = (map, locations) => {
    let markers = [];
    const filter = this.props.filter;
    const google = window.google;

    this.props.locations.forEach(location => {
      if (filter === "all" || filter === location.matter) {
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
      }
    });
    return markers;
  };
  /*
  * @desc filter the array of markers by hidding/showing them on the map  based on filter criteria,
  */
  filterMarkers = () => {
    const { map, markers } = this.state;
    const { locations, filter } = this.props;

    for (let i = 0; i < locations.length; i++) {
      if (filter === "all" || filter === locations[i].matter)
        markers[i].setMap(map);
      else markers[i].setMap(null);
    }
  };

  componentDidMount() {
    let map = this.initMap();
    let markers = this.createMarkers(map, this.props.locations);
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
  locations: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired
};

export default Map;
