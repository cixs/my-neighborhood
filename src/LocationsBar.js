import React, { Component } from "react";
import LocationsFilter from "./LocationsFilter.js";
import LocationsList from "./LocationsList.js";
import PropTypes from "prop-types";

class LocationsBar extends Component {
  render() {
    const {
      markers,
      activeMarker,
      filter,
      setFilter,
      setActiveMarker
    } = this.props;

    return (
      <div id="locations-bar">
        <LocationsFilter setFilter={setFilter} />
        <LocationsList
          markers={markers}
          activeMarker={activeMarker}
          filter={filter}
          setFilter={setFilter}
          setActiveMarker={setActiveMarker}
        />
      </div>
    );
  }
}

LocationsBar.propTypes = {
  markers: PropTypes.array,
  activeMarker: PropTypes.object,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};
export default LocationsBar;
