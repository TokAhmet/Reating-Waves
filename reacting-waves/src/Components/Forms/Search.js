import React from 'react';

//form that lets you search for a specific title and lets you list all shows after filtering.

const Search = (props) => {

    return(
        <section className="search-form">
            <label htmlFor="tInput">
            <h3> Search by Title </h3>
            </label>
            <input type="text" 
            className="form-control" 
            name="tInput" 
            onChange={props.find}
            onKeyDown={props.enter}
            placeholder="Press Enter to Search" />
        </section> 
    )
}

export default Search;