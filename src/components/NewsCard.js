import React, {Component} from "react"
import { NEWS_URL, HEADERS, CORS} from "../constants"
import { NewsHeaderCard } from 'react-ui-cards'

class NewsCard extends Component {
  constructor() {
    super()
    this.state = {
      website: null
    }
  }

  // componentWillMount = () => {
  //   this.fetchWebsite()
  // }
  //
  // fetchWebsite = () => {
  //   fetch(`${CORS}/${NEWS_URL}/${this.props.website}?fields=url`, {
  //     headers: HEADERS
  //   })
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     website: data[0].url
  //   }))
  // }

  render() {
    if (!this.state.website) {
      return <div />
    }
    return (
      <div>
        <NewsHeaderCard
          href={this.state.website}
          thumbnail={this.props.image}
          title={this.props.title}
        />
      </div>
    )
  }

}

export default NewsCard
