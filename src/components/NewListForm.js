import React, { Component, Fragment } from "react"
import NewListCard from "./NewListCard"
import { Button, Form } from 'semantic-ui-react'

class NewListForm extends Component {

  createGames = () => {
    return this.props.games.map(game =>
      <NewListCard
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
              <Form.Input placeholder="Enter List Name" onChange={this.props.handleChange}/>
              <Button type='submit'>Create List</Button>
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

export default NewListForm
