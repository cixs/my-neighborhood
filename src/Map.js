import React, { Component } from "react";
import PropTypes from "prop-types";
import mapStyles from "./map-styles.js";
import utils from "./utils.js"



class Map extends Component {
  state = {
    markers: [],
    infoWindow:{},
    map: {},
    activePos: {x:0, y:0}
  };

  /*
   * @desc create Map object
   * @return - object
   */
  initMap = (google) => {
    let loc = {
      lat: 45.7926667,
      lng: 24.1464086
    };
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
   * @param images - array of images
   * @param location - object (item in state.locations array )
   * @return - image object, an item in the images array
   */
  iconToSet = (images,location) => {
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
  createMarkers = (map, google) => {
    let markers = [];
    const { locations, filter, setActiveLocation } = this.props;
    const images = utils.importAll(require.context("./markers", false, /\.(png)$/));
    let self = this;
    locations.forEach((location, index) => {
      if (filter === "all" || filter === location.matter) {
        let marker = new google.maps.Marker({
          position: location.coord,
          map: map,
          title: location.name,
          icon: this.iconToSet(images, location)
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
   * @desc create the InfoWindow,
   * @params map - google Map object
   * @return a google.maps.InfoWindow object
   */
  createInfoWindow = (google) => {
    let contentString = `<div className="info-window">
    <h4>Name</h4>
    <hr />
    <p>number, street, city, country</p>
    <p>phone: </p>
    <p>facebook: </p>
    <hr />
    <p>foursquare: #photos, #reviews <a href="a">...see more</a></p>
    <p>flickr: #photos <a href="a">...see more</a></p>
    <p>wikipedia: <a href="a">...see more</a></p>
  </div>`
    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    return infoWindow;
  };
  /*
   * @desc show markers by hidding/showing them on the map based on filter criteria,
   *       show the active location by setting animation on the corresponding marker
   */
  updateMarkers = (prevLocation, prevFilter) => {
    const { map, markers, infoWindow } = this.state;
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
    // set/remove animation on markers, close the infoWindow 
    // and open it again near the active marker
    if (activeLocation !== prevLocation) {
      if (prevLocation > -1) {
        let animated = markers[prevLocation].getAnimation();
        if (animated){
          markers[prevLocation].setAnimation(null);
          infoWindow.close();
        } 
      }
      if (activeLocation > -1) {
        markers[activeLocation].setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.open(map, markers[activeLocation]);
      }
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
    // this is why updateMarkers is called here
    const prevLocation = prevProps.activeLocation;
    const prevFilter = prevProps.filter;
    this.updateMarkers(prevLocation, prevFilter);
  }


  render() {
    const { activePos } = this.state;
    return (
      <div className="map-container">
        <div id="map" role="application" aria-label="locations on map" />
      </div>
    );
  }
}

Map.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeLocation: PropTypes.number,
  setActiveLocation: PropTypes.func.isRequired
};

export default Map;
