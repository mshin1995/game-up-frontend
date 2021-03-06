import React, { Component, Fragment } from "react"
import { LIST } from "../constants"
import NewListForm from "./NewListForm"
import ListSearchContainer from "./ListSearchContainer"


class NewListModal extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
      title: ""
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

  getGameIds = () => {
    return this.state.games.map(game =>
      game.id
    )
  }


  addList = () => {
    fetch(LIST, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        list: {
          title: localStorage.title,
          user_id: JSON.parse(localStorage.currentUser).id,
          games: this.getGameIds()
        }
      })
    })
    .then(data => alert("List Created!"))
    .then(data => this.props.refresh())
  }

  handleChange = (e) => {
    localStorage.setItem("title", e.target.value)
  }

  render() {
    return (
      <Fragment>
        <div className="listAdd">
          <NewListForm games={this.state.games} clickEvent={this.removeGame} handleSubmit={this.addList} handleChange={this.handleChange} />
        </div>
        <ListSearchContainer clickEvent={this.addGame} />
      </Fragment>
    )
  }
}

export default NewListModal
