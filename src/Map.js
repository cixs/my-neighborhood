import React, { Component } from "react";
import PropTypes from "prop-types";
import mapStyles from "./map-styles.js";
import { importAllImagesFromFolder } from "./functions.js";

class Map extends Component {
  state = {
    markers: [],
    infoWindow: {},
    map: {}
  };

  /*
   * @desc create Map object
   * @return - object
   */
  initMap = google => {
    let loc = {
      lat: 45.7926667,
      lng: 24.1464086
    };
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: loc,
      styles: mapStyles["all"],
      scrollwheel: true
    });
    return map;
  };

  /*
   * @desc find the icon to be set on a marker depending of its location
   * @param images - array of images
   * @param location - object (item in state.locations array )
   * @return - image object, an item in the images array
   */
  iconToSet = (images, location) => {
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
   * @param string (option value of the selected option in LocationsBar filter options )
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
  createMarkers = (map, google) => {
    let markers = [];
    const { locations, filter, setNewActiveIndex } = this.props;
    const images = importAllImagesFromFolder(
      require.context("./markers", false, /\.(png)$/)
    );

    locations.forEach((location, index) => {
      if (filter === "all" || filter === location.matter) {
        let marker = new google.maps.Marker({
          position: location.coord,
          map: map,
          title: location.name,
          icon: this.iconToSet(images, location)
        });

        google.maps.event.addListener(marker, "click", () => {
          setNewActiveIndex(marker.getAnimation() ? -1 : index);
        });

        markers.push(marker);
      }
    });
    return markers;
  };

  /*
   * @desc create the InfoWindow,
   * @params map - google Map object
   * @return a google.maps.InfoWindow object
   */
  createInfoWindow = google => {
    const infoHTML = `<div><h3>location name</h3><hr />
    </div><hr /><button id="marker-remove-btn">Remove from my list</button>`
    let infoWindow = new google.maps.InfoWindow({
      content: infoHTML
    });
    return infoWindow;
  };

  /*
   * @desc show markers by hidding/showing them on the map based on filter criteria,
   *       show the active location by setting animation on the corresponding marker
   * @params - previous values of this.state variables
   */
  updateMap = (prevActiveIndex, prevFilter, prevInfoWindowContent) => {
    const { map, markers, infoWindow } = this.state;
    const { locations, filter, activeIndex, infoWindowContent } = this.props;
    const google = window.google;

    if (filter !== prevFilter) {
      // if the locations filter was changed
      // hide/show markers
      map.setOptions({
        styles: this.styleToSet(filter)
      });

      for (let i = 0; i < locations.length; i++) {
        if (filter === "all" || filter === locations[i].matter) {
          if (!markers[i].getMap()) {
            markers[i].setMap(map);
            // if the marker is active and it was previously hidden
            //  re-establish the animation when is set to be visible
            if (i === activeIndex) {
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

    if (activeIndex !== prevActiveIndex) {
      // if the active location was changed
      // set/remove animation on markers, close the infoWindow
      // and open it again near the active marker
      if (prevActiveIndex > -1) {
        let animated = markers[prevActiveIndex].getAnimation();
        if (animated) {
          markers[prevActiveIndex].setAnimation(null);
          infoWindow.close();
        }
      }
      if (activeIndex > -1) {
        markers[activeIndex].setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.open(map, markers[activeIndex]);
      }
    }

    if (prevInfoWindowContent !== infoWindowContent) {
      // if the infoWindow content was changed
      // update the infoWindow
      infoWindow.setContent(infoWindowContent);
    }
  };

  componentDidMount() {
    const google = window.google;
    let map = this.initMap(google);
    let markers = this.createMarkers(map, google);
    let infoWindow = this.createInfoWindow(google);
    this.setState({
      map: map,
      markers: markers,
      infoWindow: infoWindow
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // because render function is called first time and once before componentDidMount
    // calling updateMarkers inside render() will produce an' undefined variable' (google) error
    // this is why updateMap is called here
    const prevActiveIndex = prevProps.activeIndex;
    const prevFilter = prevProps.filter;
    const prevInfoWindowContent = prevProps.infoWindowContent;
    this.updateMap(prevActiveIndex, prevFilter, prevInfoWindowContent);
  }

  componentWillUnmount() {
    // remove all event listeners
    const { markers } = this.state;
    const google = window.google;
    markers.forEach(marker => {
      google.maps.event.clearListeners(marker, "click");
    });
  }

  render() {
    return (

        <div id="map" />

    );
  }
}

Map.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeIndex: PropTypes.number,
  setNewActiveIndex: PropTypes.func,
  infoWindowContent: PropTypes.string,
  showLocationsBar: PropTypes.bool
};

export default Map;
