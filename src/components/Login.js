import React, {Component} from "react"
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends Component {

  render() {
    if (localStorage.currentUser === 'null') {
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
    } else {
      return (
        <GoogleLogout
          className="logoutButton"
          clientId="438176320105-phev9j6ekg3eso7qu2hv4no0j86ftsfi.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={this.props.logout}
        />
      )
    }
  }
}

export default Login
