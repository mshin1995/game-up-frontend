import React, {Component} from "react"
import { Input, Icon } from 'semantic-ui-react'

class ListSearchBar extends Component {

  render () {
    return (
      <div className="listSearchBar">
        <form onSubmit={this.props.handleSubmit}>
          <Input
            icon={<Icon name='search' inverted circular link onClick={this.props.handleSubmit}/>}
            placeholder='Search for Games'
            onChange={this.props.handleChange}
            />
        </form>
      </div>
    )
  }
}

export default ListSearchBar
