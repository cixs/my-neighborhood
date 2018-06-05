import React, { Component } from "react";
import "./App.css";
import Header from "./Header.js";
import ErrorModal from "./ErrorModal.js";
import Map from "./Map.js";
import Footer from "./Footer.js";
import LocationsBar from "./LocationsBar.js";
import mapStyles from "./map-styles.js";
import pinkMarker from "./img/pink-marker.png";
import blueMarker from "./img/blue-marker.png";
import {
  _buildFlickrQueryURL,
  _buildFoursquareQueryURL,
  _makeRequest,
  _makeFlickrInfoHTML,
  _makeFoursquareInfoHTML
} from "./functions.js";

class App extends Component {
  state = {
    markers: [],
    filter: "all",
    activeMarker: null, // active marker is the one that was clicked
    infoWindowHTML: "",
    searchQuery: "",
    error: null
    /*{
         code: "id",
         info: "info",
         extra: "extra"
       }*/
  };

  /*
   * @desc change the state.filter value based on the chosen filter option in LocationsBar
   * @param string - the selected option 'value' in filter options
   */
  setFilter = filter => {
    this.setState({
      filter
    });
  };

  /*
   * @desc change the active marker when the user click a marker or an item in locations list
   * @param index - the index of the new active location in the locations array (the one that was clicked by the user)
   */
  setActiveMarker = marker => {
    let infoWindowHTML = "";
    let self = this;

    infoWindowHTML += `<div"><h3>${marker.title}</h3></div>`;

    let foursquareURL = _buildFoursquareQueryURL(marker.title, marker.position);
    //make nested http requests
    _makeRequest(foursquareURL, self.setErrorStateOn)
      .then(function(resp) {
        // add some element to the infoWindow according to the response object
        infoWindowHTML += self.infoWindowFoursquareContent(resp);

        let flickrURL = _buildFlickrQueryURL(marker.title, marker.position);
        _makeRequest(flickrURL, self.setErrorStateOn)
          .then(function(resp) {
            // add some element to the infoWindow according to the response object
            infoWindowHTML += self.infoWindowFlickrContent(resp);
            // at this point all requests are completed
            // so we have data to set this.state with the new values
            infoWindowHTML += `<hr><button id="info-window-action-btn">...</button>`;
            const { activeMarker } = self.state;
            self.setState({
              activeMarker: marker === activeMarker ? null : marker,
              infoWindowHTML: infoWindowHTML
            });
          })
          .catch(function(error) {
            // handle errors for _makeRequest(flickrURL) callback
            // http request errors are treated inside the _makeRequest function scope
            self.setErrorStateOn({
              code: "",
              info: error.message,
              extra: error.stack
            });
          });
      })
      .catch(function(error) {
        // handle errors for _makeRequest(foursquareURL) callback
        self.setErrorStateOn({
          code: "",
          info: error.message,
          extra: error.stack
        });
      });
  };

  /*
   * @desc create inner HTML for the infoWindow inside the google map
   * based on http response object from Flickr
   * @param object - response object from Flickr
   * @return string - new HTML content to be inserted in infoWindow content
   */
  infoWindowFlickrContent = response => {
    return _makeFlickrInfoHTML(response);
  };
  /*
   * @desc create inner HTML for the infoWindow inside the google map
   * based on http response object from Flickr and append to the infoWindow existing content
   * @param object - response object from Flickr
   * @return string - new HTML content to be inserted in infoWindow content
   */
  infoWindowFoursquareContent = response => {
    return _makeFoursquareInfoHTML(response);
  };

  /*
   * @desc set a new value to this.state.searchQuery 
   * @param string - query string to be used by Map component for searching
   */
  startSearch = query => {
    this.setState({
      searchQuery: query
    });
  };
  /*
   * @desc function to trigger the error state when a request returns error
   * and consequently display the error modal
   * @param error - a defined and non-empty object (if undefined or null, it wont trigger the display attributte of ErrorModal component)
   */
  setErrorStateOn = error => {
    this.setState({
      error: error
    });
  };
  /*
   * @desc called when the user click OK button in the ErrorModal
   * reset the error object in this.state to null
   */
  onErrorOK = () => {
    this.setState({
      error: null
    });
  };

  /*
   * @desc create the array of markers,
   * @params locations - an array of locations object
   * @params map - google Map object
   * @params myList - if true, then these are markers previously selected in the initial list, otherwise they are items in a search results array
   * @return array
   */
  createMarkers = (locations, map, myList) => {
    const google = window.google;
    let markers = [];

    locations.forEach(location => {
      let marker = new google.maps.Marker({
        title: location.name,
        position: location.coord,
        map: map,
        icon: myList ? pinkMarker : blueMarker
      });

      marker.types = location.matter;
      if (myList) {
        // add a new property '.added' it will be used to know which marker on the map exists or can be added in the sidebar list
        marker.added = true;
      }

      google.maps.event.addListener(marker, "click", () => {
        this.setActiveMarker(marker);
      });
      markers.push(marker);
    });

    if (myList) {
      this.setState({ markers: markers });
    }
  };

  componentWillUnmount() {
    // remove all event listeners
    const { markers } = this.state;
    let google = window.google;
    markers.forEach(marker => {
      google.maps.event.clearListeners(marker, "click");
    });
  }

  render() {
    const state = this.state;

    return (
      <div className="app">
        {state.error && (
          <ErrorModal error={state.error} onErrorOK={this.onErrorOK} />
        )}
        <LocationsBar
          markers={state.markers}
          activeMarker={state.activeMarker}
          filter={state.filter}
          setFilter={this.setFilter}
          setActiveMarker={this.setActiveMarker}
        />
        <div id="main">
          <Header
            startSearch={this.startSearch}
          />
          <Map
            createMarkers={this.createMarkers}
            markers={state.markers}
            activeMarker={state.activeMarker}
            filter={state.filter}
            infoWindowContent={state.infoWindowHTML}
            setActiveMarker={this.setActiveMarker}
            setErrorStateOn={this.setErrorStateOn}
            searchQuery={state.searchQuery}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
