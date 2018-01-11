import React from 'react';
import { browserHistory, withRouter , Redirect, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import BusinessList from './BusinessList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    }
  }

  createUser(userData) {
    let self = this;
    axios.post('/signup', userData)
      .then(resp => {
        console.log(resp);
        let loginData = {
          username: userData.username,
          password: userData.password
        }
        this.loginUser(loginData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginUser(userData) {
    let self = this;
    axios.post('/login', userData)
      .then(resp => {
        if (resp.data.length) {
          console.log('Rendering..')
          this.setState({
            username: resp.data[0].username,
            password: resp.data[0].password,
            loggedIn: true
          });
          self.props.history.push('/search');
        } else {
          console.log('INVALID USER');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBusinesses(search) {
    let self = this;
    axios.get('/search')
      .then(resp => {
        console.log(resp);
        self.props.history.push('/listings');
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <div>
        <div id="topnav">
          {this.state.loggedIn ? <Link to="/search" className="logoLink">
            YALP
          </Link> : 'YALP' }
        </div>
        <Switch>
          <Route path="/listings" render={ () => <div id="listings"><BusinessList getBusinesses={this.getBusinesses.bind(this)}/></div> } />
          <Route exact path="/" render={ () => <div id="form-background"><div id="form"><Home /></div></div> }/>
          <Route path="/search" render={ () => <div id="form-background"><div id="form"><Search getBusinesses={this.getBusinesses.bind(this)}/></div></div> }/>
          <Route path="/login" render={ () => <div id="form-background"><div id="form"><Login loginUser={this.loginUser.bind(this)}/></div></div> }/>
          <Route path="/signup" render={ () => <div id="form-background"><div id="form"><Signup createUser={this.createUser.bind(this)}/></div></div> }/>
        </Switch>
    </div>
    )
  }
}

export default withRouter(App);
