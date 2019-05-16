import React, {Component} from "react"
import NewsContainer from "./NewsContainer"
import PopularContainer from "./PopularContainer"

class Home extends Component {
  render() {
    return (
      <div>
        <NewsContainer />
        <PopularContainer />
      </div>
    )
  }
}

export default Home
