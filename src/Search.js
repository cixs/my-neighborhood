import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  onMouseClick = event => {
    event.preventDefault();
    this.onStartSearch();
  };

  onKeyDown = event => {
    if (event.keyCode === 13) {
      // enter key was pressed
      event.preventDefault();
      this.onStartSearch();
    }
  };

  onStartSearch = () => {
    const { startSearch } = this.props;
    let query = document.getElementById("search-input").value;
    startSearch(query);
  };

  componentDidMount() {
    let button = document.getElementById("search-button");
    if (button) {
      button.addEventListener("click", this.onMouseClick);
    }
    let queryInput = document.getElementById("search-input");
    if (queryInput) {
      button.addEventListener("keydown", this.onKeyDown);
    }
  }

  componentWillUnmount() {
    let button = document.getElementById("search-button");
    if (button) {
      button.removeEventListener("click", this.onMouseClick);
    }
    let queryInput = document.getElementById("search-input");
    if (queryInput) {
      button.removeEventListener("keydown", this.onKeyDown);
    }
  }
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
        <button id="search-button" aria-label="search" />
      </form>
    );
  }
}
Search.propTypes = {
  startSearch: PropTypes.func
};
export default Search;
