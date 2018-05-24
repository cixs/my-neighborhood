import React, { Component } from "react";
import SidebarFilter from "./SidebarFilter.js";
import SidebarList from "./SidebarList.js";



class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <SidebarFilter />
        <SidebarList locations={this.props.locations}/>
      </div>
    );
  }
}
export default Sidebar;
