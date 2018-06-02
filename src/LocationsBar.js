import React, { Component } from "react";
import LocationsFilter from "./LocationsFilter.js";
import LocationsList from "./LocationsList.js";
import PropTypes from "prop-types";

class LocationsBar extends Component {


  render() {
    const {
      locations,
      filter,
      activeIndex,
      setFilter,
      setNewActiveIndex
    } = this.props;
    return (
      <div id="locations-bar">
        <LocationsFilter setFilter={setFilter} />
        <LocationsList
          locations={locations}
          filter={filter}
          activeIndex={activeIndex}
          setNewActiveIndex={setNewActiveIndex}
        />
      </div>
    );
  }
}

LocationsBar.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeIndex: PropTypes.number,
  setFilter: PropTypes.func.isRequired,
  setNewActiveIndex: PropTypes.func.isRequired
};
export default LocationsBar;
