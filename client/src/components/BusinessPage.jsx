import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './Search.jsx'
import BusinessInfo from './BusinessInfo.jsx';
import PhotoFeed from './PhotoFeed.jsx';
import Reviews from './Reviews.jsx';

//props.business = business obj
class BusinessPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="businessPage">
        <div id="form">
            <Search />
        </div>
        <div className="businessInfo">
            <BusinessInfo business={this.props.business}/>
        </div>
        <div className="PhotoFeed">
          <PhotoFeed />
        </div>
        <div className="reviews">
          <Reviews />
        </div>
        <div>
        </div>
      </div>
    )
  }
}

export default BusinessPage;
