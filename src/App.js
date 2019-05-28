import React, { Component, Fragment } from "react"
import Home from "./components/Home"
import Sidebar from "./components/Sidebar"
import Search from "./components/Search"
import ListContainer from "./components/ListContainer"
import RecentContainer from "./components/RecentContainer"
import SoonContainer from "./components/SoonContainer"
import Game from "./components/Game"
import Login from "./components/Login"
import {Route, BrowserRouter as Router} from 'react-router-dom'
import { USER } from "./constants"
import logo from "./assets/logo.png"


class App extends Component {
  constructor() {
    super()
    this.state = {
      gotGame: false,
      gotSearch: false,
      searchTerm: "",
      name: "",
      id: "",
      token:"",
      loggedIn: false
    }
  }

  componentDidMount = () => {
    this.setState({
      current_user: this.getUserFromCookies("current_user")
    })
  }

  responseGoogle = (response) => {
    let token = response.getAuthResponse().id_token
    let name = response.getBasicProfile().getName()
    let email = response.getBasicProfile().getEmail()

    localStorage.setItem("loggedIn", true)

    fetch(USER, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          token: token
        }
      })
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
      loggedIn: true
    }))
    .then(data => alert("Logged In!"))
  }

  logout = (response) => {
    localStorage.setItem("loggedIn", false)

    this.setState({
      id: "",
      name: "",
      email: "",
      token: "",
      loggedIn: false
    })
    alert("Logged Out!")
  }

getUserFromCookies = (name) => {
        const key = name + '='
        const decodedCookie = decodeURIComponent(document.cookie)
        const ca = decodedCookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(key) === 0) {
                const json = JSON.parse(c.substring(key.length, c.length))
                return json
            }
        }
        return ''
    }

  renderGame = (prop) => {
    this.setState({
      gotGame: true
    })
    localStorage.setItem("currentGameId", prop)
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      gotSearch: !this.state.gotSearch
    })
    localStorage.setItem("currentSearch", this.state.searchTerm)
  }

  render() {
    return (
      <Fragment>
        <Router>
          <img className="logo" src={logo} alt="logo" />
          <Login responseGoogle={this.responseGoogle} logout={this.logout} loggedIn={this.state.loggedIn} />
          <Sidebar loggedIn={this.state.loggedIn}/>
          <Route exact path="/lists" render={() => <ListContainer userId={this.state.id} />} />
          <Route exact path="/" render={() => <Home clickEvent={this.renderGame} gotGame={this.state.gotGame} gotSearch={this.state.gotSearch} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>} />
          <Route exact path="/game" render={() => <Game gotSearch={this.state.gotSearch}/>} />
          <Route exact path="/recent" render={() => <RecentContainer />} />
          <Route exact path="/comingsoon" render={() => <SoonContainer />} />
          <Route exact path="/search" render={() => <Search clickEvent={this.renderGame} gotGame={this.state.gotGame}/>} />
        </Router>
      </Fragment>
    )
  }
}

export default App
