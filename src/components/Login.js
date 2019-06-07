import React, {Component} from "react"
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends Component {

  render() {
    if (localStorage.currentUser === 'null') {
      return (
        <GoogleLogin
          className="loginButton"
          clientId="438176320105-jabmdv7csvhcj32f0cq3vg6vfhg2hs9b.apps.googleusercontent.com"
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
          clientId="438176320105-jabmdv7csvhcj32f0cq3vg6vfhg2hs9b.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={this.props.logout}
        />
      )
    }
  }
}

export default Login
