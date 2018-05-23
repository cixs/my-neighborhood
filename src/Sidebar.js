import React, { Component } from "react";
import SidebarFilter from "./SidebarFilter.js";
import SidebarList from "./SidebarList.js";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <SidebarFilter />
        <SidebarList />
      </div>
    );
  }
}
export default Sidebar;
