import React, { Component } from 'react'
import ListComp from './ListComp'
import '../bootstrap.min.css'
import '../bootstrap.css'
import '../App.css';
import '../search.css'


import { Link } from 'react-router-dom';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      globalError: true, // Manages overall form validation
    };
  }

  // Handler for email input change
  emailHandler = (event) => {
    const value = event.target.value;
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

    this.setState({
      errorEmail: isValidEmail ? '' : 'Please enter a valid email',
      globalError: !isValidEmail || this.state.errorPassword !== '', // Check global error status
      email: value,
    });
  };

  // Handler for password input change
  passwordHandler = (event) => {
    const value = event.target.value;
    const isValidPassword = value.length >= 6;

    this.setState({
      errorPassword: isValidPassword ? '' : 'Password must be at least 6 characters long',
      globalError: this.state.errorEmail !== '' || !isValidPassword, // Check global error status
      password: value,
    });
  };

  // Handle form submission
  signInHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    // For demonstration, we can simulate checking the localStorage for users
    let isValidUser = false;
    const keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      const user = JSON.parse(localStorage.getItem(keys[i]));
      if (user.Email === email && user.Password === password) {
        isValidUser = true;
        break;
      }
    }

    if (isValidUser) {
      alert('Sign-in successful');
      // Redirect to dashboard or home page
    } else {
      alert('Invalid email or password');
    }
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.signInHandler}>
          <div className="form-group">
            <label className="font-italic font-weight-bold">SIGN IN</label>
            <br /><br />
            <input
              onChange={this.emailHandler}
              className="form-control"
              type="email"
              placeholder="Enter Your Email Address"
              required
            />
            <text>{this.state.errorEmail}</text>
          </div>
          <div className="form-group">
            <input
              onChange={this.passwordHandler}
              className="form-control"
              type="password"
              placeholder="Password"
              required
            />
            <text>{this.state.errorPassword}</text>
          </div>

          <input
            className="btn btn-dark btn-block mx-2"
            disabled={Boolean(this.state.globalError)}
            type="submit"
            value="SIGN IN"
          />
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}



