import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {

/*
* @desc start search when the user click on the spyglass
*/
  onMouseClick = event => {
    event.preventDefault();
    this.onStartSearch();
  };
/*
* start search when enter key was pressed
*/
  onKeyDown = event => {
    if (event.keyCode === 13) {
      // enter key was pressed
      event.preventDefault();
      this.onStartSearch();
    }
  };
/*
* @desc start search when enter key was pressed
* called by the click and keydown event handlers
* allthough it is possible to start a search on every change in input element
* a new search is triggered only if the user click the spyglass or press the enter key
*/
  onStartSearch = () => {
    const { startSearch } = this.props;
    let query = document.getElementById("search-input").value;
    startSearch(query);
  };
/*
* @desc this function will remove all previous search results
* but only when the user remove the query string in the imput element
*/
  onChange = (event) => {
    const { startSearch } = this.props;
    const query = event.target.value;
    if(query.length === 0)
      startSearch("");
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
      <form className="search-form" role="search" aria-label="search for locations">
        <input
          id="search-input"
          type="text"
          onChange={this.onChange}
          placeholder="Search..."
        />
        <button id="search-button" aria-label="start search" />
      </form>
    );
  }
}
Search.propTypes = {
  startSearch: PropTypes.func
};
export default Search;
