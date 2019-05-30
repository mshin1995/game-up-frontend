import React, { Fragment, Component } from "react"
import ListCard from "./ListCard"
import NewListModal from "./NewListModal"
import { LIST } from "../constants"
import Modal from 'react-modal';
import { Button, Icon } from 'semantic-ui-react'
import SearchBar from "./SearchBar"
import { Redirect } from 'react-router-dom'

class ListContainer extends Component {
  constructor() {
    super()
    this.state = {
      lists: [],
      modalIsOpen: false,
      gotSearch: false
    }
  }

  componentWillMount = () => {
    this.fetchLists()
  }

  refresh = () => {
    this.fetchLists()
  }

  handleChange = (e) => {
    localStorage.setItem("currentSearch", e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      gotSearch: !this.state.gotSearch
    })
  }

  fetchLists = () => {
    fetch(`${LIST}/${JSON.parse(localStorage.currentUser).id}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
      lists: data
    })})
  }

  createLists = () => {
    console.log('hi', this.state.lists)
    return this.state.lists.map(list =>
      <ListCard
        list={list}
        key={list.id}
        title={list.title}
        games={list.games}
        refresh={this.refresh}
      />
    )
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    if(this.state.gotSearch) {
      return <Redirect to='/search'/>
    }
    return (
      <Fragment>
        <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <div id="list">
          <h1 style={{color: "white", fontFamily: "Impact", paddingTop: "15px", paddingLeft: "20px"}}>My Lists</h1>
          <div className="listContainer">
            {this.createLists()}
          </div>
          <Button className="addListButton" onClick={this.openModal}>Add New List</Button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              className="modal"
              ariaHideApp={false}
              overlayClassName="overlay"
            >
            <NewListModal refresh={this.refresh}/>
            <Button icon className="modalButton" onClick={this.closeModal}>
              <Icon name='times' />
            </Button>
            </Modal>
        </div>
      </Fragment>
    )
  }

}

export default ListContainer
