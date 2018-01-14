import React from 'react';
import FriendActivityEntry from './FriendActivityEntry.jsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

class FriendActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [
        {
          id: 0,
          username: 'peter',
          createdAt: '2018-01-13 13:08:42',
          timeAgo: ''
        },
        {
          id: 1,
          username: 'christopher',
          createdAt: '2018-01-13 13:08:42',
          timeAgo: ''
        },
        {
          id: 2,
          username: 'kaykay',
          createdAt: '2018-01-13 13:08:42',
          timeAgo: ''
        },
        {
          id: 2,
          username: 'concon',
          createdAt: '2018-01-13 13:08:42',
          timeAgo: ''
        }
      ]
    };
    TimeAgo.locale(en);
  }

  createDate(createdAt) {
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(createdAt));
  }

  getFriendActivityEntries() {
    const { activities } = this.state;
    if (activities.length) {
      return activities.map((activity) => {
        const { id } = activity;
        activity.timeAgo = this.createDate(activity.createdAt);
        return <FriendActivityEntry key={id} activity={activity}/>
      });
    }
    return '';
  }

  render() {
    return (
      <div>
        <div>Friends Activity</div>
        <ul>{this.getFriendActivityEntries()}</ul>
      </div>
    );
  }
}

export default FriendActivity;