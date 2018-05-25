import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar.js";
import Map from "./Map.js";
import locations from "./locations.js";

class App extends Component {
  state = {
    locations: [],
    filter: "all",
    activeLocation: -1
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
    this.setState({ locations });
  }

  /*
  * @desc change the state.filter value based on the chosen filter option in Sidebar
  * @param string - the selected option 'value' in Sidebar filter options
  */
  setFilter = filter => {
    this.setState({ filter });
  };
  /*
  * @desc change the state.filter value based on the chosen filter option in Sidebar
  * @param string - the selected option 'value' in Sidebar filter options
  */
  setActiveLocation = index => {
    const activeLocation = this.state.activeLocation;
    this.setState({ activeLocation: activeLocation === index? -1 : index });
  };

  render() {
    const { locations, filter, activeLocation } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My Neighborhoods</h1>
          </header>
        </div>
        <div className="app-container">
          <Sidebar
            locations={locations}
            filter={filter}
            setFilter={this.setFilter}
            activeLocation={activeLocation}
            setActiveLocation={this.setActiveLocation}
          />
          <Map
            locations={locations}
            filter={filter}
            activeLocation={activeLocation}
            setActiveLocation={this.setActiveLocation}
          />
        </div>
      </div>
    );
  }
}

export default App;
