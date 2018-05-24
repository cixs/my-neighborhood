import React, { Component } from "react";



class SidebarFilter extends Component {
  render() {
    return (
      <div className="sidebar-filter">
        <select id="locations-filter" aria-label="filter">
          <option value="all">All locations</option>
          <option value="hotels">Accommodation</option>
          <option value="restaurants">Food & Drink</option>
          <option value="museums">Culture</option>
          <option value="historical">History</option>
          <option value="night-life">Nightlife</option>
          <option value="parks">Parks</option>
        </select>
      </div>
    );
  }
}
export default SidebarFilter;
