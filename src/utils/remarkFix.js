export const fixLink = elem => {
  const classes = ['MuiTypography-root', 'MuiLink-root', 'MuiLink-underlineHover', 'MuiTypography-colorPrimary']
  elem.querySelectorAll('a').forEach(link => {
    link.classList.add(...classes)
  })
}

export const fixInlineCode = elem => {
  const classes = ['inline-code', 'MuiPaper-rounded']
  elem.querySelectorAll(':not(pre) > code').forEach(inlineCode => {
    inlineCode.classList.add(...classes)
  })
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
    fixInlineCode(elem)
  }
}

export default remarkFix
