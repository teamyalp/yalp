import React from 'react';
import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <div>
        <input ref="searchTerm" type="text" size="30" placeholder="What's nearby?" />
          <button type="Search" onClick={e => this.props.getBusinesses(this.refs.searchTerm.value)}>
            Search!
          </button>
      </div>
    )
  }
}

export default Search;