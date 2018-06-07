import React from "react";
import PropTypes from "prop-types";

const LocationItem = props => {
  /*
  * @desc handler for mouse click on this list item
  *       call the parent setActiveItem with props.index as parameter
  */
/*
* @desc event handler for keydown event
*/
this.onKeyDown = event => {
  if (event.keyCode === 13) {
    // enter key was pressed
    event.preventDefault();
    props.setActiveMarker(props.marker);
  }
};
  this.onClick = () => {
    props.setActiveMarker(props.marker);
  };

  let strClass = "location-item";

  if (!props.filtered) {
    strClass += " no-display";
  }
  if (props.active) {
    strClass += " active-location";
  }
  
  return (
    <li className={strClass} tabIndex="0"aria-label="location"onClick={this.onClick} onKeyDown={this.onKeyDown}>
      {props.marker.name}
    </li>
  );
};

LocationItem.propTypes = {
  marker: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  filtered: PropTypes.bool.isRequired,
  setActiveMarker: PropTypes.func.isRequired
};

export default LocationItem;
