import React, {Component} from "react"
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends Component {

  render() {
    if(this.props.loggedIn === false) {
      return (
        <GoogleLogin
          className="loginButton"
          clientId="438176320105-phev9j6ekg3eso7qu2hv4no0j86ftsfi.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.props.responseGoogle}
          onFailure={this.props.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      )
    }
    if(this.props.loggedIn === true) {
      return (
        <GoogleLogout
          className="logoutButton"
          buttonText="Logout"
          onLogoutSuccess={this.props.logout}
        />
      )
    }
  }
}

export default Login
