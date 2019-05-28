import React, {Component} from "react"
import { slide as Menu } from 'react-burger-menu'

class Sidebar extends Component {

  render() {
    if (this.props.loggedIn === false) {
      return (
        <Menu noOverlay disableAutoFocus>
          <a id="Home" className="menu-item" href="/">Home</a>
          <br></br>
          <a id="Recent" className="menu-item" href="/recent">Recently Released</a>
          <br></br>
          <a id="ComingSoon" className="menu-item" href="/comingsoon">Coming Soon</a>
        </Menu>
      )
    } else {
      return(
        <Menu noOverlay disableAutoFocus>
          <a id="Home" className="menu-item" href="/">Home</a>
          <br></br>
          <a id="Recent" className="menu-item" href="/recent">Recently Released</a>
          <br></br>
          <a id="ComingSoon" className="menu-item" href="/comingsoon">Coming Soon</a>
          <br></br>
          <a id="MyLists" className="menu-item" href="/lists">My Lists</a>
        </Menu>
      )
    }
  }
}

export default Sidebar
