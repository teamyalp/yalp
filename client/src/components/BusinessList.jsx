import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';

class BusinessList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="businessEntry">
        <h1>BUSINESSES</h1>
      </div>
    )
  }
}

export default BusinessList;