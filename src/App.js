import React, { Component } from "react";
import "./App.css";
import Header from "./Header.js";
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
    infoWindowHTML: `<div">
    <h3>location</h3>
    <hr /></div>`,
    flickrContent: {},
    foursquareContent: {}
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
            .catch(function(err) {
              alert(
                `There is a problem with your request\nStatus: ${
                  err.status
                }\nurl: ${err.url.substring(0, err.url.indexOf("?"))}`
              );
            });
        })
        .catch(function(err) {
          alert(
            `There is a problem with your request\nStatus: ${
              err.status
            }\nurl: ${err.url.substring(0, err.url.indexOf("?"))}`
          );
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
    const { flickrContent, foursquareContent } = this.state;
    let infoHTML = `<div">
    <h3>${location.name}</h3>
    <hr /></div>`;

    infoHTML += _makeFoursquareInfoHTML(foursquareContent);
    infoHTML += _makeFlickrInfoHTML(flickrContent);

    this.setState({ infoWindowHTML: infoHTML });
  };

  /*
   * @desc make http request for flickr and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  setFlickrContent = response => {
    let photos = JSON.parse(response);
    this.setState({ flickrContent: photos });
  };
  /*
   * @desc make http request for foursquare and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  setFoursquareContent = response => {
    let photos = JSON.parse(response);
    this.setState({ foursquareContent: photos });
  };

  render() {
    const { locations, filter, activeIndex, infoWindowHTML } = this.state;

    return (
      <div className="app">
        <LocationsBar
          locations={locations}
          filter={filter}
          activeIndex={activeIndex}
          setFilter={this.setFilter}
          setNewActiveIndex={this.setNewActiveIndex}
        />

        <div id="main">
        <Header />
          <Map
            locations={locations}
            filter={filter}
            activeIndex={activeIndex}
            infoWindowContent={infoWindowHTML}
            setNewActiveIndex={this.setNewActiveIndex}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
