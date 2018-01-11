import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Signup from './Signup.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> Welcome to Yalp! </h1>
        <Link to="/login">
          <button type="Login">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button type="Signup">
            New User?
          </button>
        </Link>
      </div>
    )
  }
}

export default Home;