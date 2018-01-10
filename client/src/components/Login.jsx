import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.formData = {
      username: '',
      password: ''
    }
  }

  getFormData(e) {
    e.preventDefault();
    this.formData = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.loginUser(this.formData)
  }

  render() {
    return(
      <div>
        <Link to="/">
          <button type="Home">
            Go Back
          </button>
        </Link>
        <form onSubmit={ this.getFormData.bind(this) }>
          <p>Username: <input ref="username" id="username" type="text" /></p>
          <p>Password: <input ref="password" id="password" type="password" /></p>
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}


export default Login;