export const getParameterByName = (oldName, oldUrl) => {
  const url = oldUrl ? oldUrl : window.location.href

  const name = oldName.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url)

  if (!results) {return null}
  if (!results[2]) {return ''}

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const getFormatedVideoTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length)
  }

  return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2)

}
