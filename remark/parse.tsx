import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFootnotes from 'remark-footnotes'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMath from 'remark-math'
import remark2rehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import yaml from 'js-yaml'
import { PostInfo, PostFM, PostMeta } from './post'
import dayjs from 'dayjs'
import remarkExternalLinks from 'remark-external-links'
import rehypeRaw from 'rehype-raw'
import rehypeMuiLink from './rehypeMuiLink'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import react2hast from './react2hast'
import ExtLinkSign from '../components/links/extLinkSign'
import { Link as LinkIcon } from '@mui/icons-material'
import type { Parent } from 'unist'
import rehypeExtImage from './rehypeExtImage'
import site from '../content/site'
import rehypeCcIcons from './rehypeCcIcons'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from './remarkDirectiveRehype'

const parse = (name: string, content: string, pathPrefix: string = '/posts/'): PostInfo => {
  name = name.substring(0, name.length - 3)
  let fmVal = ''
  const html = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkDirectiveRehype)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => node => {
      const root = node as Parent
      fmVal = (root.children[0]! as any).value as string
      root.children.shift()
      return root
    })
    .use(remarkFootnotes, { inlineNotes: true })
    .use(remarkToc)
    .use(remarkMath)
    .use(remarkExternalLinks, {
      rel: 'noopener',
      contentProperties: { className: 'ext-link' },
      content: react2hast(<ExtLinkSign />),
    })
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeHighlight, { plainText: ['log'] })
    .use(rehypeAutolinkHeadings, {
      properties: { ariaHidden: true, tabIndex: -1, className: 'heading-link' },
      content: react2hast(<LinkIcon />),
    })
    .use(rehypeMuiLink)
    .use(rehypeExtImage, { baseUrl: site.imageBaseUrl })
    .use(rehypeCcIcons)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(content)
    .toString()
  const fm = yaml.load(fmVal) as PostFM
  const meta: PostMeta = {
    slug: name,
    title: fm.title,
    pubDate: dayjs(fm.pubDate).format('YYYY-MM-DD'),
    updDate: dayjs(fm.updDate ? fm.updDate : fm.pubDate).format('YYYY-MM-DD'),
    excerpt: fm.excerpt ? fm.excerpt : '',
    tags: fm.tags ? fm.tags : '',
    wip: Boolean(fm.wip),
    path: pathPrefix + name,
  }
  return {
    meta,
    html,
  }
}

export default parse
