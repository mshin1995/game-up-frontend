import React, { Fragment, Component } from "react"
import ListCard from "./ListCard"
import NewListModal from "./NewListModal"
import { LIST, HEADERS, CORS} from "../constants"
import Modal from 'react-modal';

class ListContainer extends Component {
  constructor() {
    super()
    this.state = {
      lists: [],
      modalIsOpen: false
    }
  }

  // componentWillMount = () => {
  //   this.fetchLists()
  // }
  //
  // fetchLists = () => {
  //   fetch(LIST)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     lists: data
  //   }))
  // }

  // createLists = () => {
  //   this.state.lists.map(list =>
  //     if(list.user_id === this.props.userId) {
  //       return <ListCard
  //         list={list}
  //         key={list.id}
  //         title={list.title}
  //         games={list.games}
  //       />
  //     }
  //   )
  // }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
      return (
        <Fragment>
        <div id="list">
          <h1>My Lists</h1>
          <div className="listContainer">
          </div>
        </div>
          <button onClick={this.openModal}>Add New List</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              className="modal"
              overlayClassName="overlay"
            >
            <NewListModal />
            <button className="modalButton" onClick={this.closeModal}>x</button>
            </Modal>
          </Fragment>
      )
    }

}

export default ListContainer
