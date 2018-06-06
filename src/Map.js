import React, { Component } from "react";
import PropTypes from "prop-types";
import mapStyles from "./map-styles.js";
import locations from "./locations.js";

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = {};
    this.infoWindow = {};
    this.searchService = {};
    this.searchMarkers = [];
    this.google = window.google;
  }

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
    let locationsArray = [];
    let self = this;
    self.infoWindow.close();
    try {
      let request = {
        location: self.map.getCenter(),
        radius: 4000,
        query: searchQuery
      };
      self.searchService.textSearch(request, function(results, status) {
        if (status === self.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(result => {
            let location = {
              name: result.name,
              formattedAdress: result.formattedAdress,
              position: result.geometry.location,
              types: result.types
            };
            locationsArray.push(location);
          });

          const { createMarkers } = self.props;
          self.searchMarkers = createMarkers(locationsArray, self.map, false);
        }
      });
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
  updateFilteredMarkers = prevProps => {
    const { filter, markers, activeMarker } = this.props;

    if (filter !== prevProps.filter) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setVisible(
          filter === "all" ||
            markers[i].types.indexOf(filter.replace(/ /g, "_")) > -1
        );
      }
      for (let i = 0; i < this.searchMarkers.length; i++) {
        this.searchMarkers[i].setVisible(
          filter === "all" ||
            this.searchMarkers[i].types.indexOf(filter.replace(/ /g, "_")) > -1
        );
      }
    }
  };

  /*
   * @desc update the content of infoWindow based on the active location
   * @params - previous props object
   */
  updateInfoWindowContent = prevProps => {
    const { infoWindowContent } = this.props;
    if (this.props.infoWindowContent !== prevProps.infoWindowContent) {
      // if the infoWindow content was changed
      // update the infoWindow
      this.infoWindow.setContent(infoWindowContent);
    }
  };
  /*
   * @desc set animation and open infoWindow for the active MArker
   * @params - previous props object
   */
  updateActiveMarker = prevProps => {
    const { activeMarker } = this.props;

    let self = this;

    if (activeMarker) {
      //if it is not null
      // shwo infoWindow linked to this marker
      activeMarker.setAnimation(self.google.maps.Animation.BOUNCE);
      if (activeMarker.getVisible()) {
        self.infoWindow.open(self.map, activeMarker);
        let button = document.getElementById("info-window-action-btn");
        if (button) {
          button.addEventListener("click", function() {
            self.infoWindowAction();
          });
          // if this marker is in the sidebar lis set the button text "Remove from list"
          // otherwise "Add to list"
          button.innerText = activeMarker.added
            ? "Remove from list"
            : "Add to list";
        }
      }else{
        self.infoWindow.close();
      }
    } else {
      //active marker is set to null

      let button = document.getElementById("info-window-action-btn");
      if (button) {
        button.removeEventListener("click", function() {
          self.infoWindowAction();
        });
        self.infoWindow.close();
      }
    }
    if (prevProps.activeMarker && prevProps.activeMarker !== activeMarker) {
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
      this.searchMarkers.forEach(marker => {
        marker.setMap(null);
      });
      this.searchMarkers = [];
      this.searchForPlaces(searchQuery);
    }
  };
  /*
   * @desc add or remove marker to the sidebar list when the user click the button inside the infoWindo
   */
  infoWindowAction = () => {
    const { activeMarker, addMarkerToList, removeMarkerFromList } = this.props;

    if (activeMarker) {
      if (activeMarker.hasOwnProperty("added") && activeMarker.added === true) {
        //if the marker has added property, then it is in the sidebar list
        // on this case, the action should be to remove it from the list
        removeMarkerFromList(activeMarker);
      } else {
        // it is not yet in the sidebar list
        // the action should be to add it from the list
        addMarkerToList(activeMarker);
      }
    }
  };

  componentDidMount() {
    const elem = document.getElementById("map");
    this.map = new this.google.maps.Map(elem, {
      zoom: 15,
      center: {
        lat: 45.7926667,
        lng: 24.1464086
      },
      styles: mapStyles["all"],
      scrollwheel: true
    });

    const infoHTML = `<div><h3>location name</h3><hr />
    </div><hr /><button id="info-window-action-btn">...</button>`;
    this.infoWindow = new this.google.maps.InfoWindow({
      content: infoHTML
    });
    this.searchService = new this.google.maps.places.PlacesService(this.map);

    const { createMarkers } = this.props;
    createMarkers(locations, this.map, true);
  }

  componentDidUpdate(prevProps, prevState) {
    // because render function is called first time and once before componentDidMount
    // calling the following functions inside render() will produce an' undefined variable' (google) error
    // this is why they are called here
    this.updateFilteredMarkers(prevProps);
    this.updateSearchResultMarkers(prevProps);
    this.updateInfoWindowContent(prevProps);
    this.updateActiveMarker(prevProps);
  }

  render() {
    return <div id="map" />;
  }
}

Map.propTypes = {
  markers: PropTypes.array,
  createMarkers: PropTypes.func,
  addMarker: PropTypes.func,
  removeMarker: PropTypes.func,
  activeAMarker: PropTypes.object,
  filter: PropTypes.string,
  infoWindowContent: PropTypes.string,
  searchQuery: PropTypes.string,
  setActiveMarker: PropTypes.func,
  setErrorStateOn: PropTypes.func
};

export default Map;
