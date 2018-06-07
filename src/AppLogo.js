import React from "react";
import app_logo from "./img/app-logo.gif";
//image source: http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42515-cityscape-icon.png

const AppLogo = props => {
  return (
    <div className="app-logo">
      <img src={app_logo} alt="application logo" width="50" height="40" />
      <h4>My Neighborhood</h4>
    </div>
  );
};

export default AppLogo;
