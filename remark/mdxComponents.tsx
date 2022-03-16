// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image'
import { MDXComponents } from 'mdx/types'

// Only for ![]() syntax
export const MdxImage = (props: { src?: string; alt?: string }) => <Image src={props.src!} alt={props.alt!} />

const mdxComponents: MDXComponents = {
  img: MdxImage,
}

export default mdxComponents
