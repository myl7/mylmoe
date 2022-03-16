// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import remarkFootnotes from 'remark-footnotes'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import remarkExternalLinks from 'remark-external-links'
import rehypeRaw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import react2hast from './react2hast'
import ExtLinkSign from '../components/links/extLinkSign'
import { Link as LinkIcon } from '@mui/icons-material'
import remarkDirectiveRehype from './remarkDirectiveRehype'
import remarkDirective from 'remark-directive'
import site from '../content/site'
import { rehypeMdxExtImage } from './rehypeExtImage'

export const remarkPlugins = [
  remarkDirective,
  remarkDirectiveRehype,
  remarkGfm,
  [remarkFootnotes, { inlineNotes: true }],
  remarkToc,
  remarkMath,
  [
    remarkExternalLinks,
    {
      rel: 'noopener',
      contentProperties: { className: 'ext-link' },
      content: react2hast(<ExtLinkSign />),
    },
  ],
]

export const rehypePlugins = [
  rehypeRaw,
  rehypeKatex,
  rehypeSlug,
  [rehypeHighlight, { plainText: ['log'] }],
  [
    rehypeAutolinkHeadings,
    {
      properties: { ariaHidden: true, tabIndex: -1, className: 'heading-link' },
      content: react2hast(<LinkIcon />),
    },
  ],
  // MDX links can reuse Link component
  // rehypeMuiLink,
  [rehypeMdxExtImage, { baseUrl: site.imageBaseUrl }],
]
