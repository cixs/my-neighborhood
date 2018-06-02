import React, { Component } from "react";
import PropTypes from "prop-types";

class LocationsFilter extends Component {
  /*
  * @desc get the option value of the selected filter option in LocationsBar
  * and call the setFilter function in App component
  */
  changeFilter = () => {
    const { setFilter } = this.props;
    let filter = document.getElementById("filter-select").value;
    setFilter(filter);
  };

  render() {
    return (
      <form className="locations-filter">
        <select
          id="filter-select"
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
      </form>
    );
  }
}

LocationsFilter.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default LocationsFilter;
