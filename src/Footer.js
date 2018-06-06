import React from "react";
import react_logo from "./img/react.png";
import node_logo from "./img/node.png";
import flickr_logo from "./img/flickr-logo.png";
import foursquare_logo from "./img/foursquare-logo.png";
import google_logo from "./img/google-logo.png";

const Footer = props => {
  return (
    <footer>
      <div className="footer-description" >
        <p>Project developed as a part of</p>
        <strong>
          <a href="https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001">
            Udacity Front-End Web Developer Nanodegree Program
          </a>
        </strong>
      </div>
      <div className="footer-credits" aria-label="frameworks and libraries">
        Built with:
        <a href="https://reactjs.org/" aria-label="react">
          <img
            className="image-rotation"
            src={react_logo}
            alt="React logo"
            height="30"
            width="30"
          />
        </a>
        <a href="https://nodejs.org" aria-label="node">
          <img src={node_logo} alt="Node logo" height="48" width="50" />
        </a>
      </div>
      <div className="footer-api" aria-label="api's and data providers">
        APIs and data from:
        <a href="https://www.google.com/" aria-label="google">
          <img src={google_logo} alt="Google logo" />
        </a>
        <a href="https://www.flickr.com/" aria-label="flickr">
          <img src={flickr_logo} alt="Flickr logo" />
        </a>
        <a href="https://www.foursquare.com/" aria-label="foursquare">
          <img src={foursquare_logo} alt="Foursquare logo" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
