import React, {Component} from "react"
import SearchCard from "./SearchCard"
import { SEARCH_URL, HEADERS, CORS} from "../constants"
import { Redirect } from 'react-router-dom'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: "",
      games: []
    }
  }

  // static getDerivedStateFromProps(props, prevState) {
  //
  //   console.log('derived props', props, prevState)
  //   return {
  //     searchTerm: props.searchTerm || localStorage.currentSearch
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //
  //   console.log('should?', nextProps.searchTerm, "state search term", this.state.searchTerm)
  //   if (nextProps.searchTerm !== this.state.searchTerm) {
  //     console.log('not same')
  //     this.fetchGames(nextState.searchTerm)
  //
  //     return true
  //   } else if (this.state.games !== nextState.games) {
  //
  //     return true
  //   }
  //
  //   return false
  // }

  componentWillMount() {
    this.setState({
      searchTerm: localStorage.currentSearch
    })
  }

  componentDidMount = () => {
    // console.log('component did mount')
    // this.setState({
    //     searchTerm: localStorage.currentSearch
    //   })

    this.fetchGames(this.state.searchTerm)
  }

  fetchGames = (searchTerm) => {

    console.log('fetching', searchTerm)
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
        clickEvent={this.props.clickEvent}
      />
    )
  }

  function = () => {
    console.log("hey")
    // if(this.state.searchTerm !== localStorage.currentSearch) {
    //   debugger
    //   this.setState({
    //     searchTerm: localStorage.currentSearch
    //   })
    // }
  }

  render() {

    // this.state.games.length > 1 ? this.function() : null

    if(this.props.gotGame){
      return <Redirect to='/game'/>
    }
    return (
      <div id="search">
        <h1 style={{color: "white", fontFamily: "Impact", paddingTop: "15px", paddingLeft: "15px"}}>Search results for "{this.state.searchTerm}"</h1>
        <div className="searchContainer">
          {this.createGames()}
        </div>
      </div>
    )
  }
}

export default Search
