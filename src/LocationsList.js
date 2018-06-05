import React, { Component } from "react";
import LocationItem from "./LocationItem.js";
import PropTypes from "prop-types";
import { _generateKey } from "./functions.js";

class LocationsList extends Component {
  render() {
    const { markers, activeMarker, filter, setActiveMarker } = this.props;
    return (
      <ul className="locations-list">
        {markers.map((marker, index) => (
          <LocationItem
            key={_generateKey(marker, index)}
            marker={marker}
            active={marker === activeMarker}
            filtered={filter === "all" || filter === marker.matter}
            setActiveMarker={setActiveMarker}
          />
        ))}
      </ul>
    );
  }
}

LocationsList.propTypes = {
  markers: PropTypes.array,
  activeMarker: PropTypes.object,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  setActiveMarker: PropTypes.func
};

export default LocationsList;
