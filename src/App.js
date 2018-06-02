import React, { Component } from "react";
import "./App.css";
import Header from "./Header.js";
import ErrorModal from "./ErrorModal.js";
import Map from "./Map.js";
import Footer from "./Footer.js";
import LocationsBar from "./LocationsBar.js";
import locations from "./locations.js";
import {
  _buildFlickrQueryURL,
  _buildFoursquareQueryURL,
  _makeRequest,
  _makeFlickrInfoHTML,
  _makeFoursquareInfoHTML,
  _generateKey
} from "./functions.js";

class App extends Component {
  state = {
    locations: [],
    filter: "all",
    activeIndex: -1, // index of the active location (the one that was clicked inside the LocationsBar list or as a marker inside the map)
    infoWindowHTML: "",
    flickrRespObj: {},
    foursquareRespObj: {},
    error: null /*{
      code: "id",
      info: "info",
      extra: "extra"
    }*/
  };

  componentWillMount() {
    // all objects in locations array will be mapped to a list element
    // this will require a unique key value for each one
    locations.forEach((loc, index) => {
      loc.key = _generateKey(loc, index);
      // index & last four digits of lat & last four digits of lng
    });
    this.setState({
      locations
    });
  }

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
   * @desc change the activeIndex value in this.state when the user click a marker or an item in locations list
   * @param index - the location index in the locations array
   */
  setNewActiveIndex = index => {
    const { locations, activeIndex } = this.state;
    const newActiveIndex = activeIndex === index ? -1 : index;

    const activeLocation = locations[newActiveIndex];

    if (newActiveIndex > -1) {
      let self = this;
      let flickrURL = _buildFlickrQueryURL(
        activeLocation.name,
        activeLocation.coord
      );
      //make nested http requests
      _makeRequest(flickrURL)
        .then(function(resp) {
          // set the flicker photos in the state variable
          self.setFlickrContent(resp);

          let foursquareURL = _buildFoursquareQueryURL(
            activeLocation.name,
            activeLocation.coord
          );
          _makeRequest(foursquareURL)
            .then(function(resp) {
              // set the foursquare venue in the state variable
              self.setFoursquareContent(resp);
              // at this point all requests are completed
              // so we have data to fill the infoWindow on google map
              self.createInfoWindowHTML(activeLocation);
            })
            .catch(function(error) {
              self.setErrorStateOn(error);
            });
        })
        .catch(function(error) {
          self.setErrorStateOn(error);
        });
    }
    this.setState({
      activeIndex: newActiveIndex
    });
  };

  /*
   * @desc create inner HTML for the infoWindow inside the google map
   * @param location - object, an element of the locations array
   */
  createInfoWindowHTML = location => {
    const { flickrRespObj, foursquareRespObj } = this.state;
    let infoHTML = `<div">
    <h3>${location.name}</h3>
    <hr></div>`;

    infoHTML += _makeFoursquareInfoHTML(foursquareRespObj);
    infoHTML += _makeFlickrInfoHTML(flickrRespObj);
    infoHTML += `<hr /><button id="marker-remove-btn">Remove from my list</button>`

    this.setState({ infoWindowHTML: infoHTML });
  };

  /*
   * @desc make http request for flickr and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  setFlickrContent = response => {
    this.setState({ flickrRespObj: response });
  };
  /*
   * @desc make http request for foursquare and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  setFoursquareContent = response => {
    this.setState({ foursquareRespObj: response  });
  };

  /*
   * @desc function to trigger the error state when a request returns error
   * and consequently display the error modal
   * @param error - object
   */
  setErrorStateOn = error => {
    this.setState({ error: error });
  };
  /*
   * @desc called when the user click OK button in the ErrorModal
   * reset the error object in this.state to null
   */
  onErrorOK = () => {
    this.setState({ error: null });
  };

  render() {
    const state = this.state;

    return (
      <div className="app">
        {state.error && (
          <ErrorModal error={state.error} onErrorOK={this.onErrorOK} />
        )}

          <LocationsBar
            locations={state.locations}
            filter={state.filter}
            activeIndex={state.activeIndex}
            setFilter={this.setFilter}
            setNewActiveIndex={this.setNewActiveIndex}
          />

        <div id="main">
          <Header />
          <Map
            locations={state.locations}
            filter={state.filter}
            activeIndex={state.activeIndex}
            infoWindowContent={state.infoWindowHTML}
            setNewActiveIndex={this.setNewActiveIndex}
            setError={this.setRequestError}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
