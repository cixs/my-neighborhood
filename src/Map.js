import React, { Component } from "react";
import PropTypes from "prop-types";
import mapStyles from "./map-styles.js";
import locations from "./locations.js";

class Map extends Component {
  state = {
    map: {},
    infoWindow: {},
    searchService: {},
    searchMarkers: []
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
   * @desc search for places inside the map area based on a search string
   * @return returns a list of Google place objects
   */
  searchForPlaces = searchQuery => {
    const google = window.google;
    const { map, searchService } = this.state;
    let request = {
      location: map.getCenter(),
      radius: 2000,
      query: searchQuery
    };
    let locationsArray = [];
    let newMarkers = [];
    let self = this;

    try {
      const { map, searchService } = self.state;
      searchService.textSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(result => {
            let location = {
              name: result.name,
              formattedAdress: result.formattedAdress,
              coord: result.geometry.location,
              matter: result.types
            };
            locationsArray.push(location);
          });

          const { createMarkers } = self.props;
          newMarkers = createMarkers(locationsArray, map, false);
        }
        //        console.log(JSON.stringify(searchResults));
      });
      this.setState({ searchMarkers: newMarkers });
    } catch (error) {
      const { setErrorStateOn } = this.props;
      setErrorStateOn({
        code: "",
        info: error.message,
        extra: ""
      });
    }
  };

  /*
   * @desc show markers by hidding/showing them on the map based on filter criteria,
   * show the active location by setting animation on the corresponding marker
   * @params - previous props object
   */
  updateFilteredLocations = prevProps => {
    const { map } = this.props;
    const { filter, markers } = this.props;
    if (filter !== prevProps.filter) {
      // if the locations filter was changed
      // hide/show markers
      map.setOptions({
        styles: this.styleToSet(filter)
      });

      for (let i = 0; i < markers.length; i++) {
        if (filter === "all" || filter === markers[i].matter) {
          if (!markers[i].getGetVisible()) {
            markers[i].setVisible(true);
          }
        } else {
          if (markers[i].getGetVisible()) {
            markers[i].setVisible(false);
          }
        }
      }
    }
  };

  /*
   * @desc update the content of infoWindow based on the active location
   * @params - previous props object
   */
  updateInfoWindowContent = prevProps => {
    const { infoWindow } = this.state;
    const { infoWindowContent } = this.props;
    if (this.props.infoWindowContent !== prevProps.infoWindowContent) {
      // if the infoWindow content was changed
      // update the infoWindow
      infoWindow.setContent(infoWindowContent);
    }
  };
  /*
   * @desc set animation and open infoWindow for the active MArker
   * @params - previous props object
   */
  updateActiveMarker = prevProps => {
    const google = window.google;
    const { infoWindow } = this.state;
    const { activeMarker, map } = this.props;
    if (activeMarker) {
      infoWindow.open(map, activeMarker);
      activeMarker.setAnimation(google.maps.Animation.BOUNCE);
    }else{
      infoWindow.close();
    }
    if (prevProps.activeMarker) {
      prevProps.activeMarker.setAnimation(null);
  }
  };
  /*
   * @desc start a new locations search  based on the  new query string
   * and display the search results on the map
   * @params - previous props object
   */
  updateSearchResultMarkers = prevProps => {
    const { searchQuery } = this.props;
    if (searchQuery !== prevProps.searchQuery) {
      this.searchForPlaces(searchQuery);
    }
  };

  componentDidMount() {
    const google = window.google;
    const elem = document.getElementById("map");
    const map = new google.maps.Map(elem, {
      zoom: 15,
      center: {
        lat: 45.7926667,
        lng: 24.1464086
      },
      styles: mapStyles["all"],
      scrollwheel: true
    });

    // if there is no internet connection or we do not have access to Google's API
    // trying to acces google object properties and methods will produce an error
    // here it a proper place to handle this error

    const infoHTML = `<div><h3>location name</h3><hr />
    </div><hr /><button id="marker-remove-btn">Remove from my list</button>`;
    const infoWindow = new google.maps.InfoWindow({
      content: infoHTML
    });
    const searchService = new google.maps.places.PlacesService(map);
    this.setState({
      map: map,
      searchService: searchService,
      infoWindow: infoWindow
    });

    const { createMarkers } = this.props;
    createMarkers(locations, map, true);
  }

  componentDidUpdate(prevProps, prevState) {
    // because render function is called first time and once before componentDidMount
    // calling the following functions inside render() will produce an' undefined variable' (google) error
    // this is why they are called here
    this.updateFilteredLocations(prevProps);
    this.updateInfoWindowContent(prevProps);
    this.updateSearchResultMarkers(prevProps);
    this.updateActiveMarker(prevProps);
  }

  render() {
    return <div id="map" />;
  }
}

Map.propTypes = {
  map: PropTypes.object,
  createMarkers: PropTypes.func,
  markers: PropTypes.array,
  activeAMarker: PropTypes.object,
  filter: PropTypes.string,
  infoWindowContent: PropTypes.string,
  searchQuery: PropTypes.string,
  setActiveMarker: PropTypes.func,
  setErrorStateOn: PropTypes.func
};

export default Map;
