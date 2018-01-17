import React from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import BusinessList from './BusinessList.jsx';
import BusinessPage from './BusinessPage.jsx';
import Profile from './Profile.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      business: {},
      userID: 0,
      loggedIn: false,
      checkedIn: false,
      favorites: {},
    }
    this.photos = [];
    this.searchResults = {};
  }

  createUser(userData) {
    let self = this; // self defined but never used in function?
    axios.post('/server/signup', userData)
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
    axios.post('/server/login', userData)
      .then(resp => {
        if (resp.data.length) {
          console.log('Rendering..')
          this.setState({
            userId: resp.data[0].id,
            username: resp.data[0].username,
            password: resp.data[0].password,
            email: resp.data[0].email,
            userID: resp.data[0].id,
            loggedIn: true,
          });
          this.getFavorite() // this vs self here? 
          self.props.history.push('/search');
        } else {
          console.log('INVALID USER');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  logoutUser() {
    this.setState({loggedIn: false})
  }

  getBusinesses(search) {
    let self = this;
    axios.get(`/server/search/${search}`)
      .then(resp => {
        console.log(resp);
        self.searchResults = resp;
        self.props.history.push('/listings');
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateBusiness(e, business) {
    e.preventDefault()
    this.getBusinessInfo(business)
  }

  getBusinessInfo(business) {
    let self = this;
    axios.get(`/server/business/${business.reference}`)
      .then(resp => {
        this.photos = [];
        if (resp.data.photos) {
          resp.data.photos.map(photo => {
            this.getBusinessPhotos(photo.photo_reference, data => {
              this.setState({business: resp.data, checkedIn: false});
              this.props.history.push(`/business/${resp.data.name}`);
            })
          })
        } else {
          this.setState({business: resp.data, checkedIn: false});
          this.props.history.push(`/business/${resp.data.name}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkIn(business) {
    let userBusinessObj = {
      userId: this.state.userId,
      business: business
    }
    axios.post('/server/profile/checkins', userBusinessObj)
      .then(resp => {
        this.setState({checkedIn: true});
      })
  }

  getBusinessPhotos(photoRef, cb) {
    axios.get(`/server/business/photos/${photoRef}`)
      .then(resp => {
        this.photos.push(resp.data);
        cb();
      })
      .catch(err => {
        console.log(err);
      })
  }

  getFavorite() {
    const { userID } = this.state;
    axios.get(`/profile/favorites/${userID}`)
      .then(resp => {
        let { favorites } = this.state;
        if (resp.data) {
          resp.data.forEach((favorite) => {
            favorites[favorite.business_id] = true;
          })
          this.setState({favorites});
        }
      });
  }

  favoriteIn(business) {
    let userBusinessObj = {
      userId: this.state.userId,
      businessId: business.id
    }
    axios.post('/profile/favorites', userBusinessObj)
      .then(result => {
        console.log('#favoriteIn: ', result);
        let { favorites } = this.state;
        let { data } = result;
        favorites[business.id] = data;
        this.setState({ favorites });
      })
  }

  getBusinessFav(businessId) {
    return this.state.favorites[businessId] ? true : false;
  }

  backToResults() {
    this.props.history.push('/listings');
  }

  render() {
    return (
      <div>
        <div id="topnav">
          {this.state.loggedIn ?
            <div onClick={e => {
              document.body.style.background = "url('beer.jpg')"; // we should look into finding the "React" way of doing this.
              document.body.style.backgroundSize = "100%";
            }}>
              <Link to="/search" className="logoLink">
                <img className="logo"src="https://image.ibb.co/cRbaE6/imageedit_16_4158574454.png"/>
                YALP!
              </Link>
              <Link to="/" className="logout">
                <div onClick={this.logoutUser.bind(this)}>Log Out</div>
              </Link>
              <Link to="/profile" className="profile">
                <div onClick={this.logoutUser.bind(this)}>Profile</div>
              </Link>
            </div> :
            <div>
              <img className="logo" src="https://image.ibb.co/cRbaE6/imageedit_16_4158574454.png"/>
              YALP!
            </div>
          }
        </div>
        <Switch>
          <Route exact path="/" render={ () => <div id="form-background"><div id="form"><Home /></div></div> }/>
          <Route path="/search" render={ () => <div id="form-background"><div id="form"><Search getBusinesses={this.getBusinesses.bind(this)}/></div></div> }/>
          <Route path="/login" render={ () => <div id="form-background"><div id="form"><Login loginUser={this.loginUser.bind(this)}/></div></div> }/>
          <Route path="/signup" render={ () => <div id="form-background"><div id="form"><Signup createUser={this.createUser.bind(this)}/></div></div> }/>
          <Route path="/listings" render={ 
            () => <div id="listings"><BusinessList 
              businesses={this.searchResults} 
              updateBusiness={this.updateBusiness.bind(this)}
              favorites={this.state.favorites} /></div> } />
          <Route path={`/business/${this.state.business.name}`} render={ // this is a nightmare.
            () => <BusinessPage business={this.state.business} 
              getBusinessInfo={this.getBusinessInfo.bind(this)} 
              getBusinesses={this.getBusinesses.bind(this)}
              getFavoriteInfo={this.getBusinessFav.bind(this)}
              checkIn={this.checkIn.bind(this)}
              username={this.state.username}
              userId={this.state.userID}
              checkedIn={this.state.checkedIn}
              getBusinessPhotos={this.getBusinessPhotos.bind(this)}
              photos={this.photos}
              favoriteIn={this.favoriteIn.bind(this)}
              backToResults={this.backToResults.bind(this)} 
              /> 
            }
          />
          <Route path="/profile" render={ () => <div><Profile profileId={this.state.userID} /></div>}/>
        </Switch>
    </div>
    )
  }
}

export default withRouter(App);
