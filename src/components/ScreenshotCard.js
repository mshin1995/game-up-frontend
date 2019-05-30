import React, { Component, Fragment } from "react"
import ImageZoom from 'react-medium-image-zoom'
import { SCREENSHOT_URL } from "../constants"


class ScreenshotCard extends Component {
  constructor() {
    super()
    this.state = {
      image: null
    }
  }

  componentWillMount = () => {
    this.refactorUrl(this.props.image)
  }

  refactorUrl = (url) => {
    let end = url.split("/").slice(-1)[0]
    this.setState({
      image: SCREENSHOT_URL + end
    })
  }

  render() {
    if (!this.state.image) {
      return <div />
    }
    return (
      <Fragment>
        <div className="screenshotCard">
        <ImageZoom
          image={{
            src: `${this.state.image}`,
          }}
          zoomImage={{
            src: `${this.state.image}`,
          }}
        />
        </div>
      </Fragment>
    )
  }
}

export default ScreenshotCard
