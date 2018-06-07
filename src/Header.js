import React from "react";
import SidebarSwitch from "./SidebarSwitch.js";
import AppLogo from "./AppLogo.js";
import Search from "./Search.js";
import PropTypes from "prop-types";

const Header = (props) =>{
 
    return (
      <header>
        <SidebarSwitch />
        <AppLogo />
        <Search startSearch={props.startSearch}/>
      </header>
    );

}

Header.propTypes = {
  startSearch: PropTypes.func.isRequired,
};
export default Header;
