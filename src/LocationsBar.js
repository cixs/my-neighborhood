import React from "react";
import LocationsFilter from "./LocationsFilter.js";
import LocationsList from "./LocationsList.js";
import PropTypes from "prop-types";

const LocationsBar = props => {


  return (
    <div id="locations-bar" role="form">
      <LocationsFilter setFilter={props.setFilter} />
      <LocationsList
        markers={props.markers}
        activeMarker={props.activeMarker}
        filter={props.filter}
        setFilter={props.setFilter}
        setActiveMarker={props.setActiveMarker}
      />
    </div>
  );
};

LocationsBar.propTypes = {
  markers: PropTypes.array,
  activeMarker: PropTypes.object,
  filter: PropTypes.string,
  setFilter: PropTypes.func
};
export default LocationsBar;
