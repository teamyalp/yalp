import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: ''
    }
    this.formData = {
      name: '',
      email: '',
      username: '',
      password: ''
    };
  }

  getFormData(e) {
    e.preventDefault();
    if (!this.refs.name.value) {
      document.getElementById("name").placeholder = "Please enter a valid name...";
    }
    if (!this.refs.email.value) {
      document.getElementById("email").placeholder = "Please enter a valid email...";
    }
    if (!this.refs.username.value) {
      document.getElementById("username").placeholder = "Please enter a valid username...";
    }
    if (!this.refs.password.value) {
      document.getElementById("password").placeholder = "Please enter a valid password...";
    }
    this.formData = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    let filledIn = true;
    for (let key in this.formData) {
      console.log(this.formData[key])
      if (!this.formData[key]) {
        filledIn = false;
        document.getElementById(`${key}`).placeholder = `Please enter a valid ${key}...`;
      }
    }
    if (filledIn) {
      this.props.createUser(this.formData)
    }
  }

  render() {
    return(
      <div>
        <Link to="/">
          <button type="Home">
            Go Back
          </button>
        </Link>
        <form onSubmit={ this.getFormData.bind(this) } >
          <input ref="name" id="name" type="text" placeholder="Name" />
          <input ref="email" id="email" type="text" placeholder="E-mail" />
          <input ref="username" id="username" type="text" placeholder="Username" />
          <input ref="password" id="password" type="password" placeholder="Password" />
          <input className='submitCreateForm' type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}


export default Signup;
