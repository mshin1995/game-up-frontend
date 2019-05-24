import React, {Component} from "react"
import NewsContainer from "./NewsContainer"
import PopularContainer from "./PopularContainer"
import SearchBar from "./SearchBar"
import { Redirect } from 'react-router-dom'

class Home extends Component {

  render() {
    if(this.props.gotGame){
      return <Redirect to='/game'/>
    }

    if(this.props.gotSearch){
      return <Redirect to='/search'/>
    }

    return (
      <div>
        <SearchBar handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange}/>
        <NewsContainer />
        <PopularContainer clickEvent={this.props.clickEvent}/>
      </div>
    )
  }
}

export default Home
