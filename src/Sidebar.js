import React, { Component } from "react";
import SidebarFilter from "./SidebarFilter.js";
import SidebarList from "./SidebarList.js";
import PropTypes from "prop-types";

class Sidebar extends Component {
 
  render() {
    const { locations, filter, setFilter } = this.props;
    return (
      <div className="sidebar">
        <SidebarFilter setFilter={setFilter} />{" "}
        <SidebarList locations={locations} filter={filter} />{" "}
      </div>
    );
  }
}

Sidebar.propTypes = {
  locations: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
};
export default Sidebar;
