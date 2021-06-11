const fixStyles = (elem: HTMLDivElement) => {
  if (!elem) {
    return
  }
  fixRespImage(elem)
}

const fixRespImage = (elem: HTMLDivElement) => {
  elem.querySelectorAll('img:not(.not-resp-image):not(.resp-image-vert)').forEach(respImage => {
    respImage.classList.add('resp-image')
  })
}

export default fixStyles
