import React from 'react'
import {getVideos} from '../utils/api'

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
          <div key={idx}>
            {console.log('##', item)}
            <label>
              <h2>{item.title}</h2>
              <p>{item.runningTime}</p>
              <img alt={item.title} src={item.thumbUrl} />
            </label>
          </div>
        ) : null
      }) :
      null

    return (
      <div>
        <h1>Video list</h1>
        {videoList}
      </div>
    )
  }
}

export default VideoList

