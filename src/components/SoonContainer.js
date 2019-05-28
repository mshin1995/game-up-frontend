import React, { Component, Fragment } from "react"
import SoonCard from "./SoonCard"
import { SOON_URL, HEADERS, CORS} from "../constants"
import { Redirect } from 'react-router-dom'
import SearchBar from "./SearchBar"

class SoonContainer extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
      gotSearch: false,
      gotGame: false
    }
  }

  handleChange = (e) => {
    localStorage.setItem("currentSearch", e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      gotSearch: !this.state.gotSearch
    })
  }

  componentWillMount() {
    this.fetchGames()
  }

  fetchGames = () => {
    let date = Math.floor(Date.now() / 1000)
    console.log(date)
    fetch(`${CORS}/${SOON_URL}${date}&limit=50`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      games: data
    }))
  }

  createGames = () => {
    return this.state.games.map(game =>
      <SoonCard
        game={game}
        key={game.id}
        name={game.name}
        cover={game.cover}
        clickEvent={this.renderGame}
      />
    )
  }

  renderGame = (prop) => {
    this.setState({
      gotGame: true
    })
    localStorage.setItem("currentGameId", prop)
  }

  render() {
    if(this.state.gotGame){
      return <Redirect to='/game'/>
    }
    if(this.state.gotSearch){
      return <Redirect to='/search'/>
    }
    return (
      <Fragment>
      <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      <div id="search">
        <h1 style={{color: "white", fontFamily: "Impact", paddingTop: "15px", paddingLeft: "15px"}}>Coming Soon</h1>
        <div className="searchContainer">
          {this.createGames()}
        </div>
      </div>
      </Fragment>
    )
  }
}

export default SoonContainer
