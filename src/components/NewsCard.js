import React, {Component} from "react"
import { NEWS_URL, HEADERS, CORS} from "../constants"

class NewsCard extends Component {
  constructor() {
    super()
    this.state = {
      website: null
    }
  }

  componentWillMount = () => {
    this.fetchWebsite()
  }

  fetchWebsite = () => {
    fetch(`${CORS}/${NEWS_URL}/${this.props.website}?fields=url`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      website: data[0].url
    }))
  }

  render() {
    if (!this.state.website) {
      return <div />
    }
    return (
      <div className="newsCard">
        <h2>
          <a href={this.state.website}>
          {this.props.title}
          </a>
        </h2>
        <img src={this.props.image} alt='img' className="newsImg"></img>
      </div>
    )
  }

}

export default NewsCard
