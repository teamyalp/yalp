import React from 'react';

class FriendActivityEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, timeAgo } = this.props.activity;
    return (
      <li>
        <span>{username}</span>
        <br />
        <span>{timeAgo}</span>
      </li>
    );
  }
}

export default FriendActivityEntry;