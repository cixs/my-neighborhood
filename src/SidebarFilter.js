import React, { Component } from "react";
import PropTypes from "prop-types";

class SidebarFilter extends Component {
  /*
  * @desc get the option value of the selected filter option in Sidebar
  * and call the setFilter function in App component
  */
  changeFilter = () => {
    const { setFilter } = this.props;
    let filter = document.getElementById("locations-filter").value;
    setFilter(filter);
  };

  render() {
    return (
      <div className="sidebar-filter">
        <select
          id="locations-filter"
          aria-label="filter"
          onChange={this.changeFilter}
        >
          <option value="all">All locations</option>
          <option value="accommodation">Accommodation</option>
          <option value="food & drink">Food & Drink</option>
          <option value="art">Art</option>
          <option value="history">History</option>
          <option value="nightlife">Nightlife</option>
          <option value="park">Parks</option>
        </select>
      </div>
    );
  }
}

SidebarFilter.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default SidebarFilter;
