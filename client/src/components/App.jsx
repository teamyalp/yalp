import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  createUser(userData) {
    console.log(userData);
  }

  loginUser(userData) {
    console.log(userData);
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