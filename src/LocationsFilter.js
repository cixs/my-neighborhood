import React from "react";
import PropTypes from "prop-types";

const LocationsFilter = props => {
  /*
  * @desc get the option value of the selected filter option in LocationsBar
  * and call the setFilter function in App component
  */
  this.changeFilter = () => {
    let filter = document.getElementById("filter-select").value;
    props.setFilter(filter);
  };

    return (
      <form className="locations-filter">
        <select
          id="filter-select"
          onChange={this.changeFilter}
        >
          <option value="all">All locations</option>
        </select>
      </form>
    );
  }

LocationsFilter.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default LocationsFilter;
