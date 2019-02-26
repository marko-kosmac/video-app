import React from 'react'
import {getVideos} from '../utils/api'
import styled from "styled-components";

const Videos = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const VideoItem = styled.div`
  width: 200px;
  margin: 1rem;
`

const Thumb = styled.img`
  width: 200px;
  height: auto;
`

class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
    }
  }

  componentDidMount() {
    getVideos()
      .then((result) => {
        this.setState({
          videos: result,
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  render() {
    const videoList = this.state.videos.length ?
      this.state.videos.map((item, idx) => {
        return item.active ? (
          <VideoItem key={idx}>
            <h2>{item.title}</h2>
            <p>{item.runningTime}</p>
            <Thumb alt={item.title} src={item.thumbUrl} />
          </VideoItem>
        ) : null
      }) : null

    return (
      <div>
        <h1>Video list</h1>
        <Videos>
          {videoList}
        </Videos>
      </div>
    )
  }
}

export default VideoList

