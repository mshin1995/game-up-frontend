import React, {Component} from "react"
import { slide as Menu } from 'react-burger-menu'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const logout = (response) => {
  console.log(response)
}

class Sidebar extends Component {

  render() {
    if(this.props.loggedIn === false) {
      return (
        <Menu noOverlay disableAutoFocus>
          <a id="Home" className="menu-item" href="/">Home</a>
          <GoogleLogin
            clientId="438176320105-phev9j6ekg3eso7qu2hv4no0j86ftsfi.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.props.responseGoogle}
            onFailure={this.props.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Menu>
      )
    }
    if(this.props.loggedIn === true) {
      return (
        <Menu noOverlay disableAutoFocus>
          <a id="Home" className="menu-item" href="/">Home</a>
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.props.logout}
          />
        </Menu>
      )
    }
  }
}

export default Sidebar
