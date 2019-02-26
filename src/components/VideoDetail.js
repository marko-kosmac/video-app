import React from 'react'
import {getVideos} from "../utils/api"
import {getParameterByName} from "../utils/misc"
import styled from "styled-components"
import ReactHLS from 'react-hls'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const Title = styled.h1`
  font-size: 2rem;
`
const Description = styled.p`
  margin: 1rem 0;
`
const BackButton = styled.button`
  margin: 2rem 0;
  width: 6rem;
  height: 2rem;
  border: 1px solid #f3f3f3;
  cursor: pointer;
`
const VideoPlayerWrapper = styled.div`
  margin: 0 2rem;
  width: 40erm;
  max-width: 90%;s 
`

class VideoDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: [],
    }
    this.returnBack = this.returnBack.bind(this)
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

  returnBack() {
    history.goBack()
  }

  render() {
    console.log('##', this.state.video)
    const videoPlayer = this.state.video ?
      <VideoPlayerWrapper>
        <BackButton onClick={this.returnBack}>BACK</BackButton>
        <Title>{this.state.video.title}</Title>
        <Description>{this.state.video.description}</Description>
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

