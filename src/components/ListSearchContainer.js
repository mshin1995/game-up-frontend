import React, { Component, Fragment } from "react"
import ListSearchCard from "./ListSearchCard"
import { SEARCH_URL, HEADERS, CORS} from "../constants"
import ListSearchBar from "./ListSearchBar"

class ListSearchContainer extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: "",
      games: []
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
      <ListSearchCard
        game={game}
        key={game.id}
        name={game.name}
        cover={game.cover}
        clickEvent={this.props.clickEvent}
      />
    )
  }

  render() {
    return (
      <Fragment>
        <ListSearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <div className="listSearchContainer">
        <p>Click on game to add</p>
        <div>
          {this.createGames()}
        </div>
      </div>
      </Fragment>
    )
  }
}

export default ListSearchContainer
