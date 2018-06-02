import React, { Component } from "react";
import LocationItem from "./LocationItem.js";
import PropTypes from "prop-types";

class LocationsList extends Component {


  render() {
    const { locations, filter, activeIndex, setNewActiveIndex  } = this.props;
    return (
        <ul className="locations-list">
          {locations.map((loc, index) => (
            <LocationItem
              key={loc.key}
              location={loc}
              visible={filter === "all" || filter === loc.matter}
              index={index}
              active={index === activeIndex}
              setNewActiveIndex ={setNewActiveIndex}
            />
          ))}
        </ul>
    );
  }
}

LocationsList.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeIndex: PropTypes.number,
  setNewActiveIndex : PropTypes.func.isRequired
};

export default LocationsList;
