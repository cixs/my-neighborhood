import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar.js";
import locations from "./locations.js";

class App extends Component {

  state = {
    locations: []
  }

  componentDidMount() {
    this.setState ({locations});
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My Neighborhoods</h1>
          </header>
        </div>
        <div className="app-container">
          <Sidebar locations = {this.state.locations} />
        </div>
      </div>
    );
  }
}

export default App;
