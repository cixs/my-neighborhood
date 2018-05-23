import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar.js";


class App extends Component {
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
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default App;
