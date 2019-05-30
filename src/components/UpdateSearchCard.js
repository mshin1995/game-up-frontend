import React, {Component} from "react"
import { SEARCH_COVER_URL, HEADERS, CORS, COVER_URL} from "../constants"
import noimage from "../assets/noimage.png"

class UpdateSearchCard extends Component {
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
      fetch(`${CORS}/${COVER_URL}/${this.props.cover.id}?fields=url`, {
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
      <div className="listSearchCard" onClick={() => this.props.clickEvent(this.props.game)}>
        <div>
          <img src={this.state.image} className="listSearchImg" alt='img'></img>
        </div>
        <div className="listSearchTitle">
          <h2 style={{fontSize: "1.2em"}}>{this.props.name}</h2>
        </div>
      </div>
    )
  }

}

export default UpdateSearchCard
