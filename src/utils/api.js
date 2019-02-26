const apiUrl = 'http://video.skincoachapp.com/v1/_debug/'

export const getVideos = (data, url) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', apiUrl)
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    req.setRequestHeader('Authorization', `Bearer`)
    req.withCredentials = false

    req.onload = () => {
      resolve(JSON.parse(req.response))
    }

    req.onerror = () => {
      reject(Error('Network Error'))
    }
    req.send(JSON.stringify(data))
  })
}
