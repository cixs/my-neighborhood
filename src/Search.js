import React, { Component } from "react";
import spyglass from "./img/spyglass.png";

class Search extends Component {
  render() {
    return (
      <form className="search-form" aria-label="search for locations">
        <input
          id="search-input"
          role="searchbox"
          aria-label="input"
          type="text"
          placeholder="Search..."
        />
        <button id="search-button" aria-label="search" type="submit">
          <img
            src={spyglass}
            aria-label="start searching"
            alt="search button spyglass"
          />
        </button>
      </form>
    );
  }
}

export default Search;
