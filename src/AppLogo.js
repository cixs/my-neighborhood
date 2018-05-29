import React from "react";
import app_logo from "./img/app-logo.gif";
//image souce: http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42515-cityscape-icon.png

const AppLogo = props => {
  return (
    <a className="app-logo" href="a">
      <img src={app_logo} alt="application logo"/>
      <h4>My Neighborhoods</h4>
    </a>
  );
};

export default AppLogo;
