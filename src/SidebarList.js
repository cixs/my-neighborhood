import React, { Component } from "react";
import LocationItem from "./LocationItem.js";
import PropTypes from "prop-types";

class SidebarList extends Component {


  render() {
    const {locations, filter} = this.props;
    return (
      <div className="sidebar-list">
        <ul>
        {locations.map(loc => (
            <LocationItem key = {loc.key} location = {loc} visible={filter ==="all" || filter === loc.matter}/>))}
        </ul>
      </div>
    );
  }
}

SidebarList.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string
};

export default SidebarList;
