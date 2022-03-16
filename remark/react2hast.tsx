// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { renderToString } from 'react-dom/server'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import type { Root, Element } from 'hast'

const react2hast = (elem: JSX.Element) => {
  const html = renderToString(elem)
  const res = unified().use(rehypeParse, { fragment: true }).parse(html) as Root
  return res['children']![0]! as Element
}

export default react2hast
