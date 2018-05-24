import React, { Component } from "react";
import PropTypes from "prop-types";

class SidebarList extends Component {

  /*
  * @desc generate a unique key for every element in locations list
  * using latitude and longitude values
  * @param object loc - an item in locations array
  * #return string
  */
  generateKey = (loc) =>{
    let key = (loc.coord.lat.toString() + loc.coord.long.toString()).replace(/\./g,"");
    return key;
  }

  render() {
    return (
      <div className="sidebar-list">
        <ul>
        {this.props.locations.map(location => (
            <li key={this.generateKey(location)}>{location.name}</li>))}
        </ul>
      </div>
    );
  }
}

SidebarList.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default SidebarList;
