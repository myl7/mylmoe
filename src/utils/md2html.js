/**
 * @param {import('marked').default} marked
 */
export default (marked) => {
  const renderer = new marked.Renderer()

  const linkRenderer = renderer.link
  renderer.link = (href, title, text) => {
    let html = linkRenderer.call(renderer, href, title, text)
    if (!href.startsWith('/')) {
      html = html.replace(/^<a /, '<a class="MuiLink-underlineHover" target="_blank" rel="noopener" ')
    }
    return html
  }

  const codeRenderer = renderer.code
  renderer.code = (code, infostring, escaped) => {
    let html = codeRenderer.call(renderer, code, infostring, escaped)
    html = html.replace(/<code>/, '<code class="plaintext">')
    return html
  }
  marked.setOptions({renderer})

  const imageRenderer = renderer.image
  renderer.image = (href, title, text) => {
    let html = imageRenderer.call(renderer, href, title, text)
    if (href.startsWith('../images/')) {
      html = html.replace(/src="\.\.\/images\//, 'src="/raw/images/')
    }
    return html
  }

  return marked
}
