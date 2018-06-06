import React from "react";
import PropTypes from "prop-types";

const LocationItem = props => {
  /*
  * @desc handler for mouse click on this list item
  *       call the parent setActiveItem with props.index as parameter
  */
  this.setActive = () => {

    props.setActiveMarker(props.marker);
  }

  let strClass = "location-item";

  if (!props.filtered) {
    strClass += " no-display";
  }
  if (props.active) {
    strClass += " active-location";
  }

  return (
    <li className={strClass} onClick={this.setActive}>
      {props.marker.name}
    </li>
  );
};

LocationItem.propTypes = {
  marker: PropTypes.object,
  active: PropTypes.bool,
  filtered: PropTypes.bool,
  setActiveMarker: PropTypes.func
};

export default LocationItem;
