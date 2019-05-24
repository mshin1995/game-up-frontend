import React, {Component, Fragment} from "react"
import SearchCard from "./SearchCard"
import { SEARCH_URL, HEADERS, CORS} from "../constants"
import { Redirect } from 'react-router-dom'
import SearchBar from "./SearchBar"

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: "",
      games: [],
      gotGame: false
    }
  }

  handleChange = (e) => {
    localStorage.setItem("currentSearch", e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      searchTerm: localStorage.currentSearch
    })
    this.fetchGames(localStorage.currentSearch)
  }

  componentWillMount() {
    this.setState({
      searchTerm: localStorage.currentSearch
    })
  }

  componentDidMount = () => {
    this.fetchGames(this.state.searchTerm)
  }

  renderGame = (prop) => {
    this.setState({
      gotGame: true
    })
    localStorage.setItem("currentGameId", prop)
  }

  fetchGames = (searchTerm) => {
    fetch(`${CORS}/${SEARCH_URL}${searchTerm}&fields=name,cover&limit=50`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      games: data
    }))
  }

  createGames = () => {
    return this.state.games.map(game =>
      <SearchCard
        game={game}
        key={game.id}
        name={game.name}
        cover={game.cover}
        clickEvent={this.renderGame}
      />
    )
  }

  render() {
    if(this.state.gotGame){
      return <Redirect to='/game'/>
    }
    return (
      <Fragment>
      <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      <div id="search">
        <h1 style={{color: "white", fontFamily: "Impact", paddingTop: "15px", paddingLeft: "15px"}}>Search results for "{this.state.searchTerm}"</h1>
        <div className="searchContainer">
          {this.createGames()}
        </div>
      </div>
      </Fragment>
    )
  }
}

export default Search
