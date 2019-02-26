import React from 'react'
import {getVideos} from "../utils/api"
import {getParameterByName} from "../utils/misc"
import styled from "styled-components"
import ReactHLS from 'react-hls'

const VideoPlayerWrapper = styled.div`
  width: 400px; 
`

class VideoDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: [],
    }
  }

  componentDidMount() {
    const videoID = parseInt(getParameterByName('videoID'))
    getVideos()
      .then((result) => {
        this.setState({
          video: result.filter((item) => {
            return item.id === videoID ? item : null
          })[0],
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  render() {
    console.log('##', this.state.video)
    const videoPlayer = this.state.video ?
      <VideoPlayerWrapper>
        <h1>{this.state.video.title}</h1>
        <p>{this.state.video.description}</p>
        <ReactHLS url={this.state.video.videoUrl} />
      </VideoPlayerWrapper> :
      null

    return (
      <div>
        {videoPlayer}
      </div>
    )
  }
}

export default VideoDetail

