import React, {Component} from "react"
import { SEARCH_COVER_URL } from "../constants"


class ListGameCard extends Component {

  refactorURL = (url) => {
    let end = url.split("/").slice(-1)[0]
    return SEARCH_COVER_URL + end
  }

  render() {
    return (
      <div className="listGameCard">
        <div>
          <img src={this.refactorURL(this.props.image)} className="listSearchImg" alt='img'></img>
        </div>
        <div className="listGameTitle">
          <h2 style={{fontSize: "1.2em"}}>{this.props.name}</h2>
        </div>
      </div>
    )
  }

}

export default ListGameCard
