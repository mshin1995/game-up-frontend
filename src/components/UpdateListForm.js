import React, { Component, Fragment } from "react"
import UpdateListCard from "./UpdateListCard"
import { Button, Form } from 'semantic-ui-react'

class UpdateListForm extends Component {

  createGames = () => {
    return this.props.games.map(game =>
      <UpdateListCard
        game={game}
        key={game.id}
        name={game.name}
        cover={game.cover}
        clickEvent={this.props.clickEvent}
      />
    )
  }

  render() {
    return (
      <Fragment>
        <div className="newListForm">
          <Form onSubmit={this.props.handleSubmit}>
            <Form.Group>
              <Form.Input placeholder="Enter List Name" defaultValue={this.props.title} onChange={this.props.handleChange}/>
              <Button type='submit'>Update List</Button>
            </Form.Group>
          </Form>
        </div>
        <p>Games Added (click on game to remove)</p>
        <div>
          {this.createGames()}
        </div>
      </Fragment>
    )
  }
}

export default UpdateListForm
