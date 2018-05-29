import React, { Component } from "react";
import logo from "./img/react.svg";
import "./App.css";
import Sidebar from "./Sidebar.js";
import Map from "./Map.js";
import AppLogo from "./AppLogo.js";
import locations from "./locations.js";
import { flickr_buildQueryURL, flickr_makeXHR } from "./functions.js";

class App extends Component {
  state = {
    locations: [],
    filter: "all",
    activeIndex: -1, // index of the active location (the one that was clicked inside the sidebar list or as a marker inside the map)
    infoWindowContent: `<div classname="infoWindow">
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
    flickrContent: {}
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
   * @desc change the state.filter value based on the chosen filter option in Sidebar
   * @param string - the selected option 'value' in filter options
   */
  setFilter = filter => {
    this.setState({
      filter
    });
  };

  /*
   * @desc change the state.filter value based on the chosen filter option in Sidebar
   * @param string - the selected option 'value' in Sidebar filter options
   */
  setNewActiveIndex = index => {
    const oldActiveIndex = this.state.activeIndex;
    const newActiveIndex = oldActiveIndex === index ? -1 : index;
    this.setState({
      activeIndex: newActiveIndex
    });

    if (newActiveIndex > -1) {
      const { locations } = this.state;
      let flickrURL = flickr_buildQueryURL(
        locations[newActiveIndex].name,
        locations[newActiveIndex].coord
      );
      let self = this;
      flickr_makeXHR(flickrURL).then(
        function(resp) {
          self.fillFlickrContent(resp);
        }
      ).catch(function (err) {
        console.error(err);
      });
    }
  };

  /*
   * @desc create inner HTML for the infoWindow inside the google map
   * @param location - object, an element of the locations array
   */
  createInfoWindowContent = location => {
    const { flickrContent } = this.state;
    let info = `<div classname="infoWindow">
    <h4>${location.name}</h4>
    <hr />
    <p>number, street, city, country</p>
    <p>phone: </p>
    <p>facebook: </p>
    <hr />
    <p>foursquare: #photos, #reviews <a href="a"> (see more)</a></p>
    <p>flickr: ${
      flickrContent.photos.total
    } photos <a href="a"> (see more)</a></p>
    <p>wikipedia: <a href="a"> (see more)</a></p>
    </div>`;
    return info;
  };

  /*
   * @desc make http request for flickr and set returned object to this.state
   * @param location - object, an element of the locations array
   */
  fillFlickrContent = response => {
    let photos = JSON.parse(response);
    this.setState({ flickrContent: photos });
    const { locations, activeIndex } = this.state;
    let info = this.createInfoWindowContent(locations[activeIndex]);
    this.setState({ infoWindowContent: info });
  };

  render() {
    const { locations, filter, activeIndex, infoWindowContent } = this.state;

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <AppLogo />
            <div className="react-logo">
              <img src={logo} className="react-img" alt="logo" />
              <h1 className="App-title"> My Neighborhoods </h1>{" "}
            </div>{" "}
          </header>{" "}
        </div>{" "}
        <div className="app-container">
          <Sidebar
            locations={locations}
            filter={filter}
            setFilter={this.setFilter}
            activeIndex={activeIndex}
            setNewActiveIndex={this.setNewActiveIndex}
          />{" "}
          <Map
            locations={locations}
            filter={filter}
            activeIndex={activeIndex}
            setNewActiveIndex={this.setNewActiveIndex}
            infoWindowContent={infoWindowContent}
          />{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
