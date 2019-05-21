import React, {Component, Fragment} from "react"
import Home from "./components/Home"
import Sidebar from "./components/Sidebar"
import Search from "./components/Search"
import SearchBar from "./components/SearchBar"
import Game from "./components/Game"
import {Route, BrowserRouter as Router} from 'react-router-dom'


class App extends Component {
  constructor() {
    super()
    this.state = {
      gotGame: false,
      gotSearch: false,
      searchTerm: ''
    }
  }

  renderGame = (prop) => {
    this.setState({
      gotGame: !this.state.gotGame
    })
    localStorage.setItem("currentGameId", prop)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let text = e.target.getElementsByTagName('input')[0].value

    this.setState({
      gotSearch: !this.state.gotSearch,
      searchTerm: text
    })

    localStorage.setItem("currentSearch", text)
  }

  render() {
    return (
      <Fragment>
        <Router>
          <SearchBar className="search" handleSubmit={this.handleSubmit} />
          <Sidebar />
          <Route exact path="/game" render={() => <Game gotSearch={this.state.gotSearch}/>} />
          <Route exact path="/search" render={() => <Search searchTerm={this.state.searchTerm} clickEvent={this.renderGame} gotGame={this.state.gotGame}/>} />
          <Route exact path="/" render={() => <Home clickEvent={this.renderGame} gotGame={this.state.gotGame} gotSearch={this.state.gotSearch}/>} />
        </Router>
      </Fragment>
    )
  }
}

export default App
