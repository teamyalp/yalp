import React from 'react';
import ReactDOM from 'react-dom';
import BusinessEntry from './BusinessEntry.jsx';
import { Link } from 'react-router-dom';

class BusinessList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.businesses.data.businesses)
    return (
      this.props.businesses.data.businesses.map(business => 
        <Link key={business.id} to={`/business/${business.id}`} onClick={(e) => this.props.updateBusiness(business)} style={{ textDecoration: 'none' }}>
        <BusinessEntry business={business} key={business.id} />
        </Link> 
      )
    )
  }
}

export default BusinessList;