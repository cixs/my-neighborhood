import React, { Component } from "react";
import "./App.css";
import LocationsBar from "./LocationsBar.js";
import Map from "./Map.js";
import AppLogo from "./AppLogo.js";
import locations from "./locations.js";
import {
  flickr_buildQueryURL,
  foursquare_buildQueryURL,
  makeRequest
} from "./functions.js";

class App extends Component {
  state = {
    locations: [],
    filter: "all",
    activeIndex: -1, // index of the active location (the one that was clicked inside the LocationsBar list or as a marker inside the map)
    infoWindowHTML: `<div classname="infoWindow">
                            <h4>Name</h4>
                            <hr />
                            <p>number, street, city, country</p>
                            <p>phone: </p>
                            <p>facebook: </p>
                            <hr />
                            <p>foursquare: #photos, #reviews <a href="a">...see more</a></p>
                            <p>flickr: #photos <a href="a">...see more</a></p>
                            <p>wikipedia: <a href="a">...see more</a></p>
                        </div>`,
    flickrContent: {},
    foursquareContent: {}
  };

  /*
   * @desc generate a unique key for every element in locations list
   * using latitude and longitude values
   * @param object loc - an item in locations array
   * @return string
   */
  generateKey = loc => {
    let key = (loc.coord.lat.toString() + loc.coord.lng.toString()).replace(
      /\./g,
      ""
    );
    return key;
  };

  componentWillMount() {
    locations.forEach(loc => {
      loc.key = this.generateKey(loc);
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
   * @desc change the state.filter value based on the chosen filter option in LocationsBar
   * @param string - the selected option 'value' in LocationsBar filter options
   */
  setNewActiveIndex = index => {
    const { locations, activeIndex } = this.state;
    const newActiveIndex = activeIndex === index ? -1 : index;
    this.setState({
      activeIndex: newActiveIndex
    });

    const activeLocation = locations[newActiveIndex];

    if (newActiveIndex > -1) {
      let self = this;
      let flickrURL = flickr_buildQueryURL(
        activeLocation.name,
        activeLocation.coord
      );
      //make nested http requests
      makeRequest(flickrURL)
        .then(function(resp) {
          // set the flicker photos in the state variable
          self.fillFlickrContent(resp);

          let foursquareURL = foursquare_buildQueryURL(
            activeLocation.name,
            activeLocation.coord
          );
          makeRequest(foursquareURL)
            .then(function(resp) {
              // set the foursquare venue in the state variable
              self.fillFoursquareContent(resp);
              // at this point all requests are completed
              // so we have data to fill the infoWindow on google map
              self.createInfoWindowHTML(activeLocation);
            })
            .catch(function(err) {
              console.error(err);
            });
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  };

  /*
   * @desc create inner HTML for the infoWindow inside the google map
   * @param location - object, an element of the locations array
   */
  createInfoWindowHTML = location => {
    const { flickrContent, foursquareContent } = this.state;
    let infoHTML = `<div classname="infoWindow">
    <h3>${location.name}</h3>
    <hr />
    <p>${foursquareContent.response.venues[0].location.formattedAddress[0] ||
      "not available"}</p>
    <p>phone: </p>
    <p>facebook: </p>
    <hr />
    <p>foursquare: #photos, #reviews <a href="a"> (see more)</a></p>
    <p>flickr: ${
      flickrContent.photos.total
    } photos <a href="a"> (see more)</a></p>
    <p>wikipedia: <a href="a"> (see more)</a></p>
    </div>`;
    this.setState({ infoWindowHTML: infoHTML });
  };

  /*
   * @desc make http request for flickr and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  fillFlickrContent = response => {
    let photos = JSON.parse(response);
    this.setState({ flickrContent: photos });
  };
  /*
   * @desc make http request for foursquare and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  fillFoursquareContent = response => {
    let photos = JSON.parse(response);
    this.setState({ foursquareContent: photos });
  };

  render() {
    const { locations, filter, activeIndex, infoWindowHTML } = this.state;

    return (
      <div className="app-container">
        <div className="left-container">
          <AppLogo />
          <LocationsBar
            locations={locations}
            filter={filter}
            setFilter={this.setFilter}
            activeIndex={activeIndex}
            setNewActiveIndex={this.setNewActiveIndex}
          />
        </div>
        <div className="App">
          <header className="App-header" />
          <Map
            locations={locations}
            filter={filter}
            activeIndex={activeIndex}
            setNewActiveIndex={this.setNewActiveIndex}
            infoWindowContent={infoWindowHTML}
          />
        </div>
      </div>
    );
  }
}

export default App;
