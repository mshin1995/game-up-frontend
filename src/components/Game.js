import React, { Component, Fragment } from "react"
import { GAMES_API, GAME_COVER_URL, COVER_URL, GENRE_URL, HEADERS, CORS } from "../constants"
import { Redirect } from 'react-router-dom'
import ProgressProvider from "./ProgressProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import SearchBar from "./SearchBar"
import ScreenshotCard from "./ScreenshotCard"

class Game extends Component {
  constructor() {
    super()
    this.state = {
      gameId: '',
      game: [],
      image: null,
      date: null,
      rating: null,
      genre: [],
      screenshot: [],
      gotSearch: false
    }
  }

  componentWillMount() {
    this.setState({
      gameId: localStorage.currentGameId
    })
  }

  componentDidMount() {
    this.fetchGame()
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

  fetchGame = () => {
    fetch(`${CORS}/${GAMES_API}/${this.state.gameId}/?fields=name,cover,first_release_date,aggregated_rating,genres,summary,screenshots.url`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      game: data[0]
    }))
    .then(data => this.fetchCover())
    .then(data => this.releaseDate())
    .then(data => this.fetchGenre())
    .then(data => this.rating())
  }

  fetchCover = () => {
    fetch(`${CORS}/${COVER_URL}/${this.state.game.cover}?fields=url`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.refactorURL(data[0].url))
  }

  refactorURL = (url) => {
    let end = url.split("/").slice(-1)[0]
    this.setState({
      image: GAME_COVER_URL + end
    })
  }

  fetchGenre = () => {
    if(this.state.game.genres === undefined) {
      this.setState({
        genre: "N/A"
      })
    } else {
      return this.state.game.genres.map(genre =>
        fetch(`${CORS}/${GENRE_URL}/${genre}/?fields=name`, {
          headers: HEADERS
        })
        .then(resp => resp.json())
        .then(data => this.setState({
          genre: [...this.state.genre, data[0].name + " "]
        }))
      )
    }
  }

  renderScreenshots = () => {
    if(this.state.game.screenshots !== undefined) {
      return this.state.game.screenshots.map(screenshot =>
        <ScreenshotCard
          screenshot={screenshot}
          key={screenshot.id}
          image={screenshot.url}
        />
      )
    }
  }

  releaseDate = () => {
    if(this.state.game.first_release_date === undefined){
      this.setState({
        date: "N/A"
      })
    } else {
      let d = new Date(this.state.game.first_release_date*1000)
      let newDate = (d.getMonth() + 1) + "/" + (d.getDate() + 1) + "/" + d.getFullYear()
      this.setState({
        date: newDate
      })}
  }

  rating = () => {
    if(this.state.game.aggregated_rating === undefined) {
      this.setState({
        rating: "N/A"
      })
    } else {
      let rating = Math.round(this.state.game.aggregated_rating)
      this.setState({
        rating: rating
      })
    }
  }

  render() {
    if (!this.state.image) {
      return <div />
    }
    if(this.state.gotSearch) {
      return <Redirect to='/search'/>
    }
    return(
      <Fragment>
      <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      <div id="game">
        <div className="gameContainer">
        <div className="gameImg">
          <img src={this.state.image} alt='img'></img>
        </div>
        <div className="gameInfo">
          <h1 style={{fontSize: "6em", fontFamily: "Impact", width: "900px"}}>{this.state.game.name}</h1>
          <h3>Release Date: {this.state.date}</h3>
          <h3>Genre: {this.state.genre}</h3>
          <p style={{fontSize: "1.5em"}}>{this.state.game.summary}</p>
        </div>
        <div className="circleContainer">
          <ProgressProvider valueStart={0} valueEnd={this.state.rating}>
            {value => <CircularProgressbar className="circle" value={value} text={`Rating: ${value}`} styles={{text:{fontSize: "15px"}}} />}
          </ProgressProvider>
        </div>
        </div>
      </div>
      <div id="screenshot">
        <div className="screenshotContainer">
          {this.renderScreenshots()}
        </div>
      </div>
      </Fragment>
    )
  }
}

export default Game
