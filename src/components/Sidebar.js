import React, {Component} from "react"
import { slide as Menu } from 'react-burger-menu'


class Sidebar extends Component {

  render() {
    return (
      <Menu noOverlay disableAutoFocus>
        <a id="Home" className="menu-item" href="/">Home</a>
      </Menu>
    )
  }

}

export default Sidebar
