import React from 'react'
import {getVideos} from '../utils/api'
import styled from "styled-components"
import {Redirect} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import {getFormatedVideoTime} from '../utils/misc'

const history = createHistory()

const Title = styled.h1`
  margin: 2rem 2rem 1rem;
`
const Videos = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const VideoItem = styled.div`
  width: 22rem;
  margin: 1rem 2rem;
  cursor: pointer;
`
const Thumb = styled.img`
  width: 20rem;
  height: auto;
`
const ThumbVideo = styled.div`
  background: #f3f3f3;
  padding: 1rem 1rem 0.25rem;
`
const Time = styled.div`
  font-size: 0.75rem;
  margin: 0;
  display: flex;
  justify-content: flex-end;
`
const Search = styled.input`
  margin: 0 2rem;
  width: 20rem;
  padding: 0.5rem;
  height: auto;
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
`

class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
    }
    this.handleSearch = this.handleSearch.bind(this)
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

  openVideo(videoID) {

    history.push({
      pathname: '/video',
      search: '?videoID='+videoID,
    })
    this.setState({
      openVideoWithID: videoID,
    })
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value.toLowerCase(),
    })
  }

  render() {
    const videoList = this.state.videos.length ?
      this.state.videos.map((item, idx) => {
        const filter = this.state.search ? item.title.toLowerCase().indexOf(this.state.search) >= 0 : true
        return item.active && filter ? (
          <VideoItem key={idx} onClick={this.openVideo.bind(this, item.id)}>
            <h3>{item.title}</h3>
            <ThumbVideo>
              <Thumb alt={item.title} src={item.thumbUrl} />
              <Time>{getFormatedVideoTime(item.runningTime)}</Time>
            </ThumbVideo>
          </VideoItem>
        ) : null
      }) : null

    return (
      <div>
        <Title>Video list</Title>
        <Search onKeyUp={this.handleSearch} placeholder="Search"/>
        <Videos>
          {videoList}
        </Videos>
        {this.state.openVideoWithID && <Redirect to={`/video?videoID=${this.state.openVideoWithID}`} />}
      </div>
    )
  }
}

export default VideoList

