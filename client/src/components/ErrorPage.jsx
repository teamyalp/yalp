import React from 'react';
import {Link} from 'react-router-dom';
import errorImage from '../../dist/500error.png';


var ErrorPage = (props) => (
  <div>
  	<img src={errorImage} />
  	<Link to="/" > 
  		<button> Go Home </button>
  	</Link>
  </div>
);

export default ErrorPage;