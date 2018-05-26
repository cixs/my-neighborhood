import React, { Component } from "react";
import PropTypes from "prop-types";
import mapStyles from "./map-styles.js";

/*
 * from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 * @desc import all images from a specific directory
 * @param r - object (context)
 * @return - array (images)
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
      lat: 45.7926667,
      lng: 24.1464086
    };
    const google = window.google;
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: loc,
      styles: mapStyles["all"],
      scrollwheel: true
    });
    return map;
  };
  /*
   * @desc find the icon to be set on a marker depending of its location
   * @param object (item in state.locations array )
   * @return - image object, an item in the images array
   */
  iconToSet = location => {
    let image;
    switch (location.matter) {
      case "accommodation":
        image = images["hotels.png"];
        break;
      case "food & drink":
        image = images["food.png"];
        break;
      case "art":
        image = images["concerts.png"];
        break;
      case "history":
        image = images["museums.png"];
        break;
      case "nightlife":
        image = images["dance-clubs.png"];
        break;
      case "park":
        image = images["parks.png"];
        break;
      default:
        image = images["marker.png"];
    }

    return image;
  };

  /*
   * @desc find the styles to be set to the map depending on the filter option
   * @param string (option value of the selected option in Sidebar filter options )
   * @return - object, an item in the mapStyles array
   */
  styleToSet = filter => {
    let styles;
    switch (filter) {
      case "accommodation":
        styles = mapStyles["accommodation"];
        break;
      case "food & drink":
        styles = mapStyles["food_and_drink"];
        break;
      case "art":
        styles = mapStyles["art"];
        break;
      case "history":
        styles = mapStyles["history"];
        break;
      case "nightlife":
        styles = mapStyles["nightlife"];
        break;
      case "park":
        styles = mapStyles["park"];
        break;
      default:
        styles = mapStyles["all"];
    }

    return styles;
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
      map.setOptions({
        styles: this.styleToSet(filter)
      });
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
    this.setState({
      map: map,
      markers: markers
    });
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
