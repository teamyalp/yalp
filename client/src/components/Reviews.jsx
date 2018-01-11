import React from 'react';
import Review from './Review.jsx';

const Reviews = (props) => (
  <div>
    <div className="friendReviews">
      EXAMPLE:  props.friends.map((friend) => ....
      <ul id="dummyReviews">
        <li>DUMMY FRIEND REVIEW1</li>
        <li>DUMMY FRIEND REVIEW2</li>
        <li>DUMMY FRIEND REVIEW3</li>
        <li>DUMMY FRIEND REVIEW4</li>
        <li>DUMMY FRIEND REVIEW5</li>
      </ul>
    </div>
    <div className="otherReviews">
      EXAMPLE:  props.others.map((friend) => ....
      <ul id="dummyReviews">
        <li>DUMMY NON-FRIEND REVIEW1</li>
        <li>DUMMY NON-FRIEND REVIEW2</li>
        <li>DUMMY NON-FRIEND REVIEW3</li>
        <li>DUMMY NON-FRIEND REVIEW4</li>
        <li>DUMMY NON-FRIEND REVIEW5</li>
      </ul>
    </div>
  </div>
)

export default Reviews;