import React, { Component, Fragment } from "react"
import { SEARCH_URL, HEADERS, CORS} from "../constants"
import { Redirect } from 'react-router-dom'
import NewListForm from "./NewListForm"
import ListSearchContainer from "./ListSearchContainer"


class NewListModal extends Component {
  constructor() {
    super()
    this.state = {
      games: []
    }
  }

  addGame = (prop) => {
    if(!this.state.games.includes(prop)) {
      this.setState({
        games: [...this.state.games, prop]
      })
    }
  }

  removeGame = (prop) => {
    this.setState({
      games: this.state.games.filter(object => object !== prop)
    })
  }

  render() {
    return (
      <Fragment>
      <div className="listAdd">
      <NewListForm games={this.state.games} clickEvent={this.removeGame} />
      </div>
      <ListSearchContainer clickEvent={this.addGame} />
      </Fragment>
    )
  }
}

export default NewListModal
