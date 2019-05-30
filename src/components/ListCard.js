import React, { Component, Fragment } from "react"
import { GAMES_API, HEADERS, CORS, LIST } from "../constants"
import ListGameCard from "./ListGameCard"
import { Button, Icon } from 'semantic-ui-react'
import Modal from 'react-modal'
import UpdateListModal from "./UpdateListModal"

class ListCard extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
      modalIsOpen: false
    }
  }

  componentWillMount = () => {
    this.fetchGames()
  }

  fetchGames = () => {
    this.props.games.map(game =>
      fetch(`${CORS}/${GAMES_API}/${game}?fields=name,cover.url`, {
        headers: HEADERS
      })
      .then(resp => resp.json())
      .then(data => this.setState({
        games: [...this.state.games, data[0]]
      }))
    )
  }

  createGames = () => {
    return this.state.games.map(game =>
      <ListGameCard
        game={game}
        key={game.id}
        name={game.name}
        image={game.cover.url}
        clickEvent={this.props.clickEvent}
      />
    )
  }

  deleteList = () => {
    fetch(`${LIST}/${this.props.list.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resp => resp.json())
    .then(data => alert("List Deleted!"))
    .then(data => this.props.refresh())
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      games: []
    })
    this.fetchGames()
  }

  render() {
    return (
      <Fragment>
      <div className="listCard">
        <h2 className="listCardTitle" style={{fontSize: "1.5em", fontFamily: "Impact"}}>{this.props.title}</h2>
        <div className="listGameContainer">
          {this.createGames()}
        </div>
        <Button className="editButton" onClick={this.openModal}>Edit List</Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            className="modal"
            ariaHideApp={false}
            overlayClassName="overlay"
          >
          <UpdateListModal games={this.state.games} list={this.props.list} title={this.props.list.title} refresh={this.props.refresh} />
          <Button icon className="modalButton" onClick={this.closeModal}>
            <Icon name='times' />
          </Button>
          </Modal>
        <Button className="deleteButton" onClick={this.deleteList}>Delete List</Button>
      </div>
      </Fragment>
    )
  }

}

export default ListCard
