import React from "react";
import PropTypes from "prop-types";

const Search = (props) => {
  /*
* @desc start search when the user click on the spyglass
*/
  this.onMouseClick = event => {
    event.preventDefault();
    this.onStartSearch();
  };
/*
* start search when enter key was pressed
*/
this.onKeyDown = event => {
    if (event.keyCode === 13) {
      // enter key was pressed
      event.preventDefault();
      this.onStartSearch();
    }
  };
  /*
* @desc called by the click and keydown event handlers
* allthough it is possible to start a search on every change in input element
* a new search is triggered only if the user click the spyglass or press the enter key
*/
this.onStartSearch = () => {
  
    let query = document.getElementById("search-input").value;
    props.startSearch(query);
  };

/*
* @desc remove all previous search results
* but only when the user remove the query string in the imput element
*/
this.onChange = event => {

    const query = event.target.value;
    if (query.length === 0) props.startSearch("");
  };
 
    return (
      <form
        className="search-form"
        role="search"
        aria-label="search for locations"
      >
        <input
          id="search-input"
          type="text"
          label="search keyword"
          aria-label="search keyword"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder="Search..."
        />
        <button id="search-button" aria-label="start search" onClick={this.onMouseClick}/>
      </form>
    );

}

Search.propTypes = {
  startSearch: PropTypes.func.isRequired,
};
export default Search;
