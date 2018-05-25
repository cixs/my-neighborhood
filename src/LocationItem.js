import React, { Component } from "react";
import PropTypes from "prop-types";


class LocationItem extends Component {
  state = {
    active: false
  }


  render() {
    const {location, visible} = this.props;
    let strClass = "location-item";
    if(!visible)
      strClass+= " no-display"
    return (
       <li className={strClass}>{location.name}</li>
    );
  }
}


LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired
};

export default LocationItem;