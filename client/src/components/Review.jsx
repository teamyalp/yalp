import React from 'react';
import axios from 'axios';

//props: review (userId, rating, text), businessId, username, userId
//need to get username from userId
class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  componentWillMount() {
    this.getUsernameOfReview();
  }

  getUsernameOfReview() {
    axios.get('/server/user', {
      params: {
        userId: this.props.review.user_id
      }
    })
      .then(response => {
        console.log('username response', response.data[0].username);
        this.setState({
          username: response.data[0].username
        })
      })
      .catch(err => {
        if (err) { console.log(err) }
      })
  }

  render() {
    let imgArr = [];
    for (let i = 0; i < this.props.review.rating; i++) {
      imgArr.push(
        (<img className="ratingLogo" key={i} src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>)
      )
    }

    return (
      <div className="review">
        <div className="review-author">{this.state.username}</div>
        <div className="review-rating">{imgArr}</div>
        <div className="review-date">{this.props.review.createdAt}</div>
        <div className="review-text">{this.props.review.text}</div>
      </div>
    )
  }
}

export default Review;
