import React, { Component } from "react";
import HamburgerBtn from "./HamburgerBtn.js";
import AppLogo from "./AppLogo.js";
import Search from "./Search.js";

class Header extends Component {
  render() {
    return (
      <header>
        <HamburgerBtn />
        <AppLogo />
        <Search />
      </header>
    );
  }
}

export default Header;
