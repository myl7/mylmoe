import {renderToString} from 'react-dom/server'
import unified from 'unified'
import rehypeParse from 'rehype-parse'
import ExtLinkSign from '../components/links/extLinkSign'
import type {Root, Element} from 'hast'

const extLinkSign = () => {
  const html = renderToString(
    <ExtLinkSign />
  )
  const res = unified()
    .use(rehypeParse, {fragment: true})
    .parse(html) as Root
  return res['children']![0]! as Element
}

export default extLinkSign()
