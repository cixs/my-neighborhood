import React, { Component } from "react";
import sidebar_switch from "./img/sidebar-switch.png";
//image from https://www.onlinewebfonts.com/icon/248745

class SidebarSwitch extends Component {
  state = { showLocationsBar: true };
  /*
   * @desc show/hide left container when the user click on hamburger menu
   */
switchLocationsBar = () => {
    const {showLocationsBar} = this.state;

    let bar = document.getElementById("locations-bar");
    let main = document.getElementById("main");
    if (bar && main) {
      if (showLocationsBar) {
        bar.style.display = "none";
        main.style.width= "100%";
      } else {
        bar.style.display = "block";
        main.style.width= "calc( 100% - 240px)";
      }
    }
   
    this.setState({ showLocationsBar: !showLocationsBar });
  };

  render() {
    return (
      <div tabIndex="0" className="sidebar-switch" role="button">
        <img
          src={sidebar_switch}
          alt="sidebar switch"
          height="40"
          width="40"
          onClick={this.switchLocationsBar}
        />
      </div>
    );
  }
}

export default SidebarSwitch;
