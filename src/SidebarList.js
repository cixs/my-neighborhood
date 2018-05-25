import React, { Component } from "react";
import LocationItem from "./LocationItem.js";
import PropTypes from "prop-types";

class SidebarList extends Component {
  /*
  * @desc invoked by a LocationItem after a mouse click
  *       call the parent setActiveLocation with index as parameter
  * @params index - the index of the calling LocationItem in the LocationList
  */
  setActiveItem = index => {
    const { setActiveLocation } = this.props;
    setActiveLocation(index);
  };

  render() {
    const { locations, filter, activeLocation } = this.props;
    return (
      <div className="sidebar-list" aria-label="a list of locations">
        <ul>
          {locations.map((loc, index) => (
            <LocationItem
              key={loc.key}
              location={loc}
              visible={filter === "all" || filter === loc.matter}
              index={index}
              active={index === activeLocation}
              setActiveItem={this.setActiveItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

SidebarList.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeLocation: PropTypes.number,
  setActiveLocation: PropTypes.func.isRequired
};

export default SidebarList;
