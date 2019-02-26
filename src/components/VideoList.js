import React from 'react'
import {getVideos} from '../utils/api'
import styled from "styled-components"
import {Redirect} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import {getFormatedVideoTime} from '../utils/misc'

const history = createHistory()

const Videos = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const VideoItem = styled.div`
  width: 300px;
  margin: 1rem;
`

const Thumb = styled.img`
  width: 300px;
  height: auto;
`

const Search = styled.input`
  width: 300px;
  height: auto;
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
          <VideoItem key={idx}>
            <h2>{item.title}</h2>
            <p>{getFormatedVideoTime(item.runningTime)}</p>
            <Thumb alt={item.title} src={item.thumbUrl} onClick={this.openVideo.bind(this, item.id)}/>
          </VideoItem>
        ) : null
      }) : null

    return (
      <div>
        <h1>Video list</h1>
        <Search onKeyUp={this.handleSearch} />
        <Videos>
          {videoList}
        </Videos>
        {this.state.openVideoWithID && <Redirect to={`/video?videoID=${this.state.openVideoWithID}`} />}
      </div>
    )
  }
}

export default VideoList

