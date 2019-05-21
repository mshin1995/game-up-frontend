import React, {Component} from "react"
import { Input, Icon } from 'semantic-ui-react'

class SearchBar extends Component {

  render () {
    return (
      <div className="search">
        <form onSubmit={this.props.handleSubmit}>
          <Input
            icon={<Icon name='search' inverted circular link onClick={this.props.handleSubmit}/>}
            placeholder='Search...'
            />
        </form>
      </div>
    )
  }
}

export default SearchBar
