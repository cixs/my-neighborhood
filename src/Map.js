import React, { Component } from "react";
import PropTypes from "prop-types";

/*
  * from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
  * @desc import all images from a specific directory
  * @param r - require context
  * @return - images array
  */
function importAll(r) {
  // markers icon pack from https://templatic.com/directory-resources/
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
    return images[item];
  });
  return images;
}
const images = importAll(require.context("./markers", false, /\.(png)$/));

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
  * @desc find the icon to be seted on a marker depending of its location
  * @return - image object, an item in the images array
  */
  iconToSet = location => {
    let image;

    if (location.matter === "accommodation") {
      image = images["hotels.png"];
    } else if (location.matter === "food & drink") {
      image = images["food.png"];
    } else if (location.matter === "art") {
      image = images["concerts.png"];
    } else if (location.matter === "history") {
      image = images["museums.png"];
    } else if (location.matter === "nightlife") {
      image = images["dance-clubs.png"];
    } else if (location.matter === "park") {
      image = images["parks.png"];
    } else {
      image = images["marker.png"];
    }
    return image;
  };
  /*
  * @desc create the array of markers,
  * @params map - google Map object
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
          title: location.name,
          icon: this.iconToSet(location)
        });
        marker.index = index;
        marker.addListener("click", function() {
          setActiveLocation(marker.getAnimation() ? -1 : marker.index);
        });
        markers.push(marker);
      }
    });
    return markers;
  };

  /*
  * @desc show markers by hidding/showing them on the map based on filter criteria,
  *       show the active location by setting animation on the corresponding marker
  */
  updateMarkers = (prevLocation, prevFilter) => {
    const { map, markers } = this.state;
    const { locations, filter, activeLocation } = this.props;
    const google = window.google;

    // if the locations filter was changed
    // hide/show markers
    if (filter !== prevFilter) {
      for (let i = 0; i < locations.length; i++) {
        if (filter === "all" || filter === locations[i].matter) {
          if (!markers[i].getMap()) {
            markers[i].setMap(map);
            // if the marker is active and it was previously hidden
            // when is set to be visible re-establish the animation
            if (i === activeLocation) {
              markers[i].setAnimation(google.maps.Animation.BOUNCE);
            }
          }
        } else {
          if (markers[i].getMap()) {
            markers[i].setMap(null);
          }
        }
      }
    }

    // if the active location was changed
    // set/remove animation on markers
    if (activeLocation !== prevLocation) {
      if (prevLocation > -1) {
        let animated = markers[prevLocation].getAnimation();
        if (animated) markers[prevLocation].setAnimation(null);
      }
      if (activeLocation > -1) {
        markers[activeLocation].setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  };

  componentDidMount() {
    let map = this.initMap();
    let markers = this.createMarkers(map);
    this.setState({ map: map, markers: markers });
  }

  componentDidUpdate(prevProps, prevState) {
    // because render function is called first time and once before componentDidMount
    // call of updateMarkers inside render() will produce an' undefined variable' (google) error
    // this is why updateMarkers is called here
    const prevLocation = prevProps.activeLocation;
    const prevFilter = prevProps.filter;
    this.updateMarkers(prevLocation, prevFilter);
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
