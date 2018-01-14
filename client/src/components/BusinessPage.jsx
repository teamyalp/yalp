import React from 'react';
import Search from './Search.jsx'
import BusinessInfo from './BusinessInfo.jsx';
import BusinessMap from './BusinessMap.jsx'
import PhotoFeed from './PhotoFeed.jsx';
import Reviews from './Reviews.jsx';
import AddReview from './AddReview.jsx';
import FriendActivity from './FriendActivity.jsx';

class BusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendReviews: [],
      nonFriendReviews: []
    }
  }

  render() {
    return (
      <div className="businessPage">
        <Search getBusinesses={this.props.getBusinesses}/>
        <BusinessInfo business={this.props.business}/>
        {this.props.checkedIn ? <div onClick={e => {this.props.checkIn(this.props.business)}} className="checkIn">Already Checked In!</div> :
        <div onClick={e => {this.props.checkIn(this.props.business)}} className="checkIn">Check In</div> }
        <PhotoFeed getBusinessPhotos={this.props.getBusinessPhotos} photos={this.props.photos}/>
        <div className="addReview">
          <AddReview business={this.props.business} username={this.props.username} userId={this.props.userId} />
        </div>
        <div className="reviews">
          <Reviews business={this.props.business} username={this.props.username} userId={this.props.userId} />
        </div>
        <div className="friendActivity">
          <FriendActivity/>
        </div>
      </div>
    )
  }
}

export default BusinessPage;
