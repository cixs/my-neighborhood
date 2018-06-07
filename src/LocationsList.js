import React from "react";
import LocationItem from "./LocationItem.js";
import PropTypes from "prop-types";
import { _generateKey } from "./functions.js";

const LocationsList = props => {
  return (
    <ul className="locations-list" aria-label="list of locations">
      {props.markers.map((marker, index) => (
        <LocationItem
          key={_generateKey(marker, index)}
          marker={marker}
          active={marker === props.activeMarker}
          filtered={
            props.filter === "all" ||
            marker.types.indexOf(props.filter.replace(/ /g, "_")) > -1
          }
          setActiveMarker={props.setActiveMarker}
        />
      ))}
    </ul>
  );
};

LocationsList.propTypes = {
  markers: PropTypes.array.isRequired,
  activeMarker: PropTypes.object,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired
};

export default LocationsList;
