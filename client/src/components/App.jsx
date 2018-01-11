import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  createUser(userData) {
    axios.post('/signup', userData)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginUser(userData) {
    axios.post('/login', userData)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={ () => <Login loginUser={this.loginUser.bind(this)} /> } />
        <Route path="/signup" render={ () => <Signup createUser={this.createUser.bind(this)} /> } />
      </Switch>
    )
  }
}

export default App;