import React, { Component } from "react";
import PropTypes from "prop-types";

class LocationItem extends Component {
  /*
  * @desc handler for mouse click on this list item
  *       call the parent setActiveItem with props.index as parameter
  */
  setActive = () => {
    const index = this.props.index;
    const setActiveItem = this.props.setActiveItem;
    setActiveItem(index);
  };

  render() {
    const { location, visible, active } = this.props;
    let strClass = "location-item";

    if (!visible) {
      strClass += " no-display";
    }
    if (active) {
      strClass += " active-location";
    }
    return (
      <li className={strClass} onClick={this.setActive}>
        {location.name}
      </li>
    );
  }
}

LocationItem.propTypes = {
  location: PropTypes.object,
  visible: PropTypes.bool,
  active: PropTypes.bool,
  index: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired
};

export default LocationItem;
