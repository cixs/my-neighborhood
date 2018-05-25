import React, { Component } from "react";
import SidebarFilter from "./SidebarFilter.js";
import SidebarList from "./SidebarList.js";
import PropTypes from "prop-types";

class Sidebar extends Component {
  render() {
    const {
      locations,
      filter,
      activeLocation,
      setFilter,
      setActiveLocation
    } = this.props;
    return (
      <div className="sidebar">
        <SidebarFilter setFilter={setFilter} />
        <SidebarList
          locations={locations}
          filter={filter}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  locations: PropTypes.array,
  filter: PropTypes.string,
  activeLocation: PropTypes.number,
  setFilter: PropTypes.func.isRequired,
  setActiveLocation: PropTypes.func.isRequired
};
export default Sidebar;
