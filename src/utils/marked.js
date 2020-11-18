import marked from 'marked'

export default (src) => {
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

  return marked(src)
}
