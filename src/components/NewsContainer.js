import React, {Component} from "react"
import NewsCard from "./NewsCard"
import { NEWS_API, HEADERS, CORS} from "../constants"

class NewsContainer extends Component {
  constructor() {
    super()
    this.state = {
      articles: []
    }
  }

  componentWillMount = () => {
    this.fetchArticles()
  }

  fetchArticles = () => {
    fetch(`${CORS}/${NEWS_API}/?fields=title,image,website&order=published_at:desc`, {
      headers: HEADERS
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      articles: data
    }))
  }

  createArticles = () => {
    return this.state.articles.map(article =>
      <NewsCard
        article={article}
        key={article.id}
        title={article.title}
        image={article.image}
        website={article.website}
      />
    )
  }

  render() {
    return (
      <div className="newsContainer">
        <h1>Recent News</h1>
        <div>
          {this.createArticles()}
        </div>
      </div>
    )
  }
}

export default NewsContainer
