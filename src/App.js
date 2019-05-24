import React, {Component, Fragment} from "react"
import Home from "./components/Home"
import Sidebar from "./components/Sidebar"
import Search from "./components/Search"
import SearchBar from "./components/SearchBar"
import ListContainer from "./components/ListContainer"
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
          <Sidebar />
          // <Route exact path="/list" render={() => <ListContainer userId={this.state.id} />} />
          <Route exact path="/game" render={() => <Game gotSearch={this.state.gotSearch}/>} />
          <Route exact path="/search" render={() => <Search clickEvent={this.renderGame} gotGame={this.state.gotGame}/>} />
          <Route exact path="/" render={() => <Home clickEvent={this.renderGame} gotGame={this.state.gotGame} gotSearch={this.state.gotSearch} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>} />
        </Router>
      </Fragment>
    )
  }
}

export default App
