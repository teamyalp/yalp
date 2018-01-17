import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './GoogleSuggest.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.latLin = undefined;
  }

  latLinChange(loc) {
    this.latLin = loc;
  }

  render() { 
    return (
      <div>
        <h3>Location</h3>
        <Suggest locChange={this.latLinChange.bind(this)}/>
        <input className="searchBar" ref="searchTerm" type="text" size="30" placeholder="What's nearby?" />
        <button type="Search" onClick={e => this.props.getBusinesses(this.refs.searchTerm.value, this.latLin)}>
          Search!
        </button>
      </div>
    )
  }
}

export default Search;