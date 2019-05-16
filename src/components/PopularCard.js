import React, {Component} from "react"
import { COVER_URL, HEADERS, CORS, POPULAR_URL} from "../constants"

class PopularCard extends Component {
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
    fetch(`${CORS}/${COVER_URL}/${this.props.cover}?fields=url`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.refactorURL(data[0].url))
  }

  refactorURL = (url) => {
    let end = url.split("/").slice(-1)[0]
    this.setState({
      image: POPULAR_URL + end
    })
  }

  render() {
    if (!this.state.image) {
      return <div />
    }
    return (
      <div>
        <h2>{this.props.name}</h2>
        <img src={this.state.image} alt='img'></img>
      </div>
    )
  }

}

export default PopularCard
