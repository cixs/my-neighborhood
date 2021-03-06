import React, { Component } from "react";
import "./App.css";
import Header from "./Header.js";
import ErrorModal from "./ErrorModal.js";
import Map from "./Map.js";
import Footer from "./Footer.js";
import LocationsBar from "./LocationsBar.js";
import pinkMarker from "./img/pink-marker.png"; // downloaded from http://www.iconarchive.com/
import blueMarker from "./img/blue-marker.png"; // downloaded from http://www.iconarchive.com/

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
    activeMarker: null, // active marker is the one that was clicked and is bouncing
    infoWindowHTML: "",
    searchQuery: "",
    error: null
    /*{
         code: "",
         info: "",
         extra: ""
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
   * @desc when a marker is added to the list, append its 'types' values as filter options
   * but only if they aren't in the options
   * @param types- the property 'types' of a google marker
   */
  appendFilterOptions = types => {
    let filter = document.getElementById("filter-select");
    if (filter) {
      types.forEach(type => {
        let exist = false;
        let cleanType = type.replace(/_/g, " ");
        for (let i = 0; i < filter.options.length; i++) {
          if (filter.options[i].text === cleanType) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          // at this point we know that the type does not exist in options list
          // then it will be added
          let option = document.createElement("option");
          option.value = cleanType;
          option.innerHTML = cleanType;
          filter.appendChild(option);
        }
      });
    }
  };

  /*
   * @desc change the active marker when the user click a marker or an item in locations list
   * @param index - the index of the new active location in the locations array (the one that was clicked by the user)
   */
  setActiveMarker = marker => {
    const { activeMarker } = this.state;
    if (marker === activeMarker) {
      // if the actual active marker is not null and it was clicked again
      // only set the activeMarker to null, then it will remove animation and infoWindow inside the map
      this.setState({
        activeMarker: null
      });
    } else {
      // another marker vas clicked and should be set as active
      // it needs to find and fill the infoWindow with new content about the next active marker

      let infoWindowHTML = `<div><h3>${marker.name}</h3></div>`;
      let self = this;
      if (navigator.onLine) {
        let foursquareURL = _buildFoursquareQueryURL(
          marker.name,
          marker.position
        );
        //make nested http requests
        _makeRequest(foursquareURL, self.setErrorStateOn)
          .then(function(resp) {
            // add some element to the infoWindow according to the response object
            infoWindowHTML += self.infoWindowFoursquareContent(resp);

            let flickrURL = _buildFlickrQueryURL(marker.name, marker.position);
            _makeRequest(flickrURL, self.setErrorStateOn)
              .then(function(resp) {
                // add some element to the infoWindow according to the response object
                infoWindowHTML += self.infoWindowFlickrContent(resp);
                // at this point all requests are completed
                // so we have data to set this.state with the new values
                infoWindowHTML += `<hr><button id="info-window-action-btn">...</button>`;
                self.setState({
                  activeMarker: marker,
                  infoWindowHTML: infoWindowHTML
                });
              })
              .catch(function(error) { // any javaScript error or exception
                // handle errors for _makeRequest(flickrURL) callback
                // http request errors are handled inside the _makeRequest function
                self.setErrorStateOn({
                  code: "",
                  message: error.message,
                  extra: "App.js file, _makeRequest to Flickr callback"
                });
              });
          })
          .catch(function(error) { // any javaScript error or exception
            // handle errors for _makeRequest(foursquareURL) callback
            // http request errors are handled inside the _makeRequest function
            self.setErrorStateOn({
              code: "",
              message: error.message,
              extra: "App.js file, _makeRequest to Foursquare callback"
            });
          });
      } //if (navigator.onLine)
      else {
        infoWindowHTML += `<div><p>No internet conection available</p><p>HTTP requests can not be processed</p></div>`;
        this.setState({
          activeMarker: marker,
          infoWindowHTML: infoWindowHTML
        });
      }
    }
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
    if (navigator.onLine) {
      // because the search will start only if the query string is different than the previous query
      // do not update the state.searchQuery if there is not internet connection
      this.setState({
        searchQuery: query
      });
    } else {
      this.setErrorStateOn({
        message: "No internet conection available",
        extra: "Can not access Google's search service"
      });
    }
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
    let button = document.getElementById("error-ok-btn");
    if (button) {
      button.focus();
    }
  };
  /*
   * @desc called when the userpress Enter key or click OK button in the ErrorModal
   * reset the error object in this.state to null
   */
  onErrorOK = () => {
    this.setState({
      error: null
    });
  };

  /*
   * @desc create the array of markers,
   * @param locations - an array of locations object
   * @param map - google Map object
   * @param myList - if true, then these are markers previously selected in the initial list, otherwise they are items in a search results array
   * @return array
   */
  createMarkers = (locations, map, myList) => {
    const google = window.google;
    let markers = [];
    try {
      locations.forEach(location => {
        let marker = new google.maps.Marker({
          name: location.name,
          position: location.position,
          types: location.types,
          map: map,
          icon: myList ? pinkMarker : blueMarker
        });

        marker.types = location.types;
        this.appendFilterOptions(marker.types);
        if (myList) {
          // add a new property '.added' it will be used to know which marker on the map exists or can be added in the sidebar list
          marker.added = true;
        }

        google.maps.event.addListener(marker, "click", () => {
          this.setActiveMarker(marker);
        });
        markers.push(marker);
      });
    } catch (error) { // any javaScript error or exception
      this.setErrorStateOn({
        message: error.message,
        extra: "App.js file, createMarkers function"
      });
    }

    if (myList) {
      this.setState({
        markers: markers
      });
    } else {
      // this function was caaled inside Map component so
      // the array represents markers resulted from search places
      // and they will be used there
      return markers;
    }
  };

  /*
   * @desc add a new marker to the sidebar list
   * @param marker - google Marker object
   */
  addMarkerToList = marker => {
    let { markers } = this.state;
    marker.setIcon(pinkMarker);
    marker.added = true;
    markers.push(marker);
    this.appendFilterOptions(marker.types);
    this.setState({
      markers: markers,
      activeMarker: null
    });
  };

  /*
   * @desc remove an existing marker from the sidebar list
   * @param marker - google Marker object
   */
  removeMarkerFromList = marker => {
    let { markers } = this.state;
    marker.setIcon(blueMarker);
    delete marker.added;
    let index = markers.indexOf(marker);
    if (index > -1 && index < markers.length) markers.splice(index, 1);
    this.setState({
      markers: markers,
      activeMarker: null
    });
  };

  componentWillUnmount = () => {
    // remove all event listeners
    const { markers } = this.state;
    try {
      let google = window.google;
      markers.forEach(marker => {
        google.maps.event.clearListeners(marker, "click");
      });
    } catch (error) { // any javaScript error or exception
      this.setErrorStateOn({
        message: error.message,
        extra: "App.js file, componentWillUnmount function"
      });
    }
  };

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
          <Header startSearch={this.startSearch} />
          <Map
            markers={state.markers}
            createMarkers={this.createMarkers}
            addMarkerToList={this.addMarkerToList}
            removeMarkerFromList={this.removeMarkerFromList}
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
