import React, { Component } from "react";
import hamburger_btn from "./img/hamburger.png";

class HamburgerBtn extends Component {
  state = { showLocationsBar: true };
  /*
   * @desc show/hide left container when the user click on hamburger menu
   */
  toggleLocationsBar = () => {
    const {showLocationsBar} = this.state;

    let bar = document.getElementById("locations-bar");
    let main = document.getElementById("main");
    if (bar && main) {
      if (showLocationsBar) {
        bar.style.display = "none";
        main.style.width= "100%"
      } else {
        bar.style.display = "inline-block";
        main.style.width= "calc( 100% - 240px)"
      }
    }
   
    this.setState({ showLocationsBar: !showLocationsBar });
  };

  render() {
    return (
      <div className="hamburger-btn">
        <img
          src={hamburger_btn}
          alt="hamburger button"
          height="36"
          width="36"
          onClick={this.toggleLocationsBar}
        />
      </div>
    );
  }
}

export default HamburgerBtn;
