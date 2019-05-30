import React, { Component, Fragment } from "react"
import { LIST } from "../constants"
import UpdateListForm from "./UpdateListForm"
import UpdateSearchContainer from "./UpdateSearchContainer"


class UpdateListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      title: props.title
    }
  }

  componentWillMount = () => {
    this.existingGames()
  }

  existingGames = () => {
    this.setState({
      games: this.props.games
    })
  }

  addGame = (prop) => {
    if(!this.props.games.includes(prop)) {
      this.setState({
        games: [...this.state.games, prop]
      })
    }
  }

  removeGame = (prop) => {
    console.log(prop)
    this.setState({
      games: this.state.games.filter(object => object !== prop)
    })
  }

  getGameIds = () => {
    return this.state.games.map(game =>
      game.id
    )
  }

  updateList = () => {
    fetch(`${LIST}/${this.props.list.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        list: {
          title: this.state.title,
          user_id: JSON.parse(localStorage.currentUser).id,
          games: this.getGameIds()
        }
      })
    })
    .then(data => alert("List Updated!"))
    .then(data => this.props.refresh())
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <div className="listAdd">
          <UpdateListForm games={this.state.games} title={this.props.title} clickEvent={this.removeGame} handleSubmit={this.updateList} handleChange={this.handleChange} />
        </div>
        <UpdateSearchContainer clickEvent={this.addGame} />
      </Fragment>
    )
  }
}

export default UpdateListModal
