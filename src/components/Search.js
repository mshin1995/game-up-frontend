import React, {Component} from "react"
import SearchCard from "./SearchCard"
import { SEARCH_URL, HEADERS, CORS} from "../constants"
import { Redirect } from 'react-router-dom'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: props.searchTerm,
      games: []
    }
  }

  static getDerivedStateFromProps(props, prevState) {

    console.log('derived props', props, prevState)
    return {
      searchTerm: props.searchTerm || localStorage.currentSearch
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    console.log('should?', nextProps.searchTerm, "state search term", this.state.searchTerm)
    if (nextProps.searchTerm !== this.state.searchTerm) {
      console.log('not same')
      this.fetchGames(nextState.searchTerm)

      return true
    } else if (this.state.games !== nextState.games) {

      return true
    }

    return false
  }

  // componentWillMount() {
  //   this.setState({
  //     searchTerm: localStorage.currentSearch
  //   })
  // }

  componentDidMount = () => {
    console.log('component did mount')
    this.setState({
        searchTerm: localStorage.currentSearch
      })

    this.fetchGames(this.props.searchTerm)
  }

  fetchGames = (searchTerm) => {

    console.log('fetching', searchTerm)
    fetch(`${CORS}/${SEARCH_URL}${searchTerm}&fields=name,cover`, {
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
        clickEvent={this.props.clickEvent}
      />
    )
  }

  render() {
    if(this.props.gotGame === true){
      return <Redirect to='/game'/>
    }

    return (
      <div>
        <h1>Search Results {this.state.searchTerm}</h1>
        <ul>
          {this.createGames()}
        </ul>
      </div>
    )
  }
}

export default Search
