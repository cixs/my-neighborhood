import React, { Component } from "react";
import PropTypes from "prop-types";

class LocationItem extends Component {
  /*
  * @desc handler for mouse click on this list item
  *       call the parent setActiveItem with props.index as parameter
  */
  setActive = () => {
    const { marker, setActiveMarker } = this.props;
    setActiveMarker(marker);
  };

  render() {
    const { marker, active, filtered } = this.props;
    let strClass = "location-item";

    if (!filtered) {
      strClass += " no-display";
    }
    if (active) {
      strClass += " active-location";
    }
    return (
      <li className={strClass} onClick={this.setActive}>
        {marker.title}
      </li>
    );
  }
}

LocationItem.propTypes = {
  marker: PropTypes.object,
  active: PropTypes.bool,
  filtered: PropTypes.bool,
  setActiveMarker: PropTypes.func
};

export default LocationItem;
