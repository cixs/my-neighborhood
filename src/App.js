import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar.js";
import Map from "./Map.js";
import locations from "./locations.js";

class App extends Component {

  state = {
    locations: []
  }

  componentWillMount() {
    this.setState ({locations});
  }

  render() {
    const {locations} = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My Neighborhoods</h1>
          </header>
        </div>
        <div className="app-container">
          <Sidebar locations = {locations} />
          <Map locations = {locations}/>
        </div>
      </div>
    );
  }
}

export default App;
