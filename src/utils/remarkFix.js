export const fixLink = elem => {
  const classes = ['MuiTypography-root', 'MuiLink-root', 'MuiLink-underlineHover', 'MuiTypography-colorPrimary']
  const links = elem.querySelectorAll('a')
  for (const link of links) {
    link.classList.add(...classes)
  }
}

const remarkFix = (elem, fixList) => {
  if (!elem) {
    return
  }
  if (fixList) {
    for (const fix of fixList) {
      fix(elem)
    }
  } else {
    fixLink(elem)
  }
}

export default remarkFix
