import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friends: [],
      checkins: [],
      reviews: [],
      fav_bus: []
    };
  }

  fetchProfile() {
    const { profileId } = this.props;
    axios.get(`/server/user/${profileId}`)
      .then(resp => {
        this.setState({ user: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchFriends() {

  }

  fetchCheckins() {

  }

  fetchReviews() {

  }

  fetchFavBus() {

  }

  componentDidMount() {
    this.fetchProfile();
  }

  render() {
    return (
      <div>Profile Page </div>
    );
  }
}

export default Profile;