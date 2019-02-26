export const getParameterByName = (oldName, oldUrl) => {
  const url = oldUrl ? oldUrl : window.location.href

  const name = oldName.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url)

  if (!results) {return null}
  if (!results[2]) {return ''}

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
