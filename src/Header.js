import React, { Component } from "react";
import HamburgerBtn from "./HamburgerBtn.js";
import AppLogo from "./AppLogo.js";
import Search from "./Search.js";
import PropTypes from "prop-types";

class Header extends Component {

  render() {
    const {startSearch, setErrorStateOn } = this.props;
    return (
      <header>
        <HamburgerBtn />
        <AppLogo />
        <Search startSearch={startSearch}setErrorStateOn={setErrorStateOn }/>
      </header>
    );
  }
}
Header.propTypes = {
  startSearch:PropTypes.func
};
export default Header;
