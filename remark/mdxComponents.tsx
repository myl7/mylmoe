// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image'
import { MDXComponents } from 'mdx/types'
import ExtLink from '../components/links/extLink'

// Only for ![]() syntax
export const MdxImage = (props: { src?: string; alt?: string }) => <Image src={props.src!} alt={props.alt!} />

// []() should only be used for external links
export const MdxExtLink = (props: { href?: string; children?: React.ReactNode }) => (
  <ExtLink href={props.href!}>{props.children}</ExtLink>
)

const mdxComponents: MDXComponents = {
  img: MdxImage,
  a: MdxExtLink,
}

export default mdxComponents
