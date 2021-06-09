const fixStyles = (elem: HTMLDivElement) => {
  if (!elem) {
    return
  }
  fixLink(elem)
  fixInlineCode(elem)
  fixRespImage(elem)
}

export const fixLink = (elem: HTMLDivElement) => {
  const classes = ['MuiTypography-root', 'MuiLink-root', 'MuiLink-underlineHover', 'MuiTypography-colorPrimary']
  elem.querySelectorAll('a').forEach(link => {
    link.classList.add(...classes)
  })
}

export const fixInlineCode = (elem: HTMLDivElement) => {
  const classes = ['inline-code', 'MuiPaper-rounded']
  elem.querySelectorAll(':not(pre) > code').forEach(inlineCode => {
    inlineCode.classList.add(...classes)
  })
}

export const fixRespImage = (elem: HTMLDivElement) => {
  elem.querySelectorAll('img:not(.not-resp-image):not(.resp-image-vert)').forEach(respImage => {
    respImage.classList.add('resp-image')
  })
}

export default fixStyles
