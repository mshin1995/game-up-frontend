import React, {Component} from "react"
import { SEARCH_COVER_URL, HEADERS, CORS, COVER_URL} from "../constants"
import noimage from "../assets/noimage.png"

class SearchCard extends Component {
  constructor() {
    super()
    this.state = {
      image: null
    }
  }

  componentWillMount = () => {
    this.fetchCover()
  }

  fetchCover = () => {
    if(this.props.cover === undefined){
      this.setState({
        image: noimage
      })
    } else {
      fetch(`${CORS}/${COVER_URL}/${this.props.cover}?fields=url`, {
        headers: HEADERS
      })
      .then(resp => resp.json())
      .then(data => this.refactorURL(data[0].url))
    }
  }

  refactorURL = (url) => {
    let end = url.split("/").slice(-1)[0]
    this.setState({
      image: SEARCH_COVER_URL + end
    })
  }

  render() {
    if (!this.state.image) {
      return <div />
    }
    return (
      <div onClick={() => this.props.clickEvent(this.props.game.id)}>
        <h2>{this.props.name}</h2>
        <img src={this.state.image} alt='img'></img>
      </div>
    )
  }

}

export default SearchCard
