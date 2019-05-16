import React, {Component} from "react"
import PopularCard from "./PopularCard"
import { GAMES_API, HEADERS, CORS} from "../constants"

class PopularContainer extends Component {
  constructor() {
    super()
    this.state = {
      games: []
    }
  }

  componentWillMount = () => {
    this.fetchGames()
  }

  fetchGames = () => {
    fetch(`${CORS}/${GAMES_API}/?fields=name,cover&order=popularity:desc`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      games: data
    }))
  }

  createGames = () => {
    return this.state.games.map(game =>
      <PopularCard
        game={game}
        key={game.id}
        name={game.name}
        cover={game.cover}
      />
    )
  }

  render() {
    return (
      <div>
        <h1>Popular Games</h1>
        <ul>
          {this.createGames()}
        </ul>
      </div>
    )
  }

}

export default PopularContainer
