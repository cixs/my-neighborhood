import React, { Component } from "react";
import SidebarFilter from "./SidebarFilter.js";
import SidebarList from "./SidebarList.js";
import PropTypes from "prop-types";


class Sidebar extends Component {


  render() {
    const {locations} = this.props;
    return (
      <div className="sidebar">
        <SidebarFilter />
        <SidebarList locations={locations}/>
      </div>
    );
  }
}
Sidebar.propTypes = {
  locations: PropTypes.array.isRequired,
};
export default Sidebar;
