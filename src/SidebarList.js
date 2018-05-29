import React, { Component } from "react";
import LocationItem from "./LocationItem.js";
import PropTypes from "prop-types";

class SidebarList extends Component {


  render() {
    const { locations, filter, activeLocation, setNewActiveIndex  } = this.props;
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
              setNewActiveIndex ={setNewActiveIndex}
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
  setNewActiveIndex : PropTypes.func.isRequired
};

export default SidebarList;
