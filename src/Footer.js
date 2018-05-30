import React, { Component } from "react";
import react_logo from "./img/react.svg";
import node_logo from "./img/node.svg";

class Footer extends Component {
  render() {
    return (
        <footer>
            <div className="footer-description">
          <p>Project developed as a part of</p>  
          <p><strong>
            <a href="https://eu.udacity.com/">
               Udacity Front-End Web Developer Nanodegree Program
            </a>
          </strong></p>
          </div>
          <div className="footer-credits">
              <p>Built with: </p>
              <a href="https://reactjs.org/"><img src={react_logo} alt="React logo" height="48" width="48"></img></a>
              <a href="https://nodejs.org"> <img src={node_logo} alt="Node logo" height="48" width="48"></img></a>
              </div>
      </footer>
    );
  }
}
export default Footer;
