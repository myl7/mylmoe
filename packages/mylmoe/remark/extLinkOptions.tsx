import {RemarkExternalLinksOptions} from 'remark-external-links'
import {renderToString} from 'react-dom/server'
import unified from 'unified'
import rehypeParse from 'rehype-parse'
import type {Node} from 'unist'
import ExtLinkSign from '../components/links/extLinkSign'

const icon = () => {
  const html = renderToString(
    <ExtLinkSign />
  )
  const res = unified()
    .use(rehypeParse, {fragment: true})
    .parse(html)
  return (res['children'] as Node[])[0]!
}

const extLinkOptions: RemarkExternalLinksOptions = {
  rel: 'noopener',
  contentProperties: {className: 'ext-link'},
  content: icon()
}

export default extLinkOptions
