// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider, Heading, HStack, Tag, Text } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path/posix'
import Footer from '../components/footer'
import Header, { headerHeight } from '../components/header'
import { components, rehypePlugins, remarkPlugins } from '../utils/mdx'
import { getMeta, type Meta } from '../utils/post'
import HljsStyle from '../components/hljsStyle'
import type { Frontmatter } from '../posts'

interface PostProps {
  mdx: any
  meta: Meta
  ppath: string
}

const Post: NextPage<PostProps> = (props) => {
  const { mdx, meta, ppath } = props

  return (
    <div>
      <Head>
        <title>{`${meta.title} | mylmoe: myl7's blog & utils`}</title>
        {meta.abstract && <meta name="description" content={meta.abstract} />}
        <link rel="canonical" href={'https://myl.moe' + ppath} />
      </Head>
      <HljsStyle />
      <Header />
      <Box
        as="main"
        pt={headerHeight + 4}
        pb={2}
        px={2}
        id="post"
        sx={{ '--post-block-mx': '21px' }} // For child non-heading block margin in index.css
        w="fit-content"
        maxW="calc(100% - 2 * var(--post-block-mx))"
      >
        <Box px={6}>
          <Heading as="h1" size="md">
            {meta.title}
          </Heading>
          <Text>{meta.abstract}</Text>
          <Text fontSize="sm">
            {meta.updatedDate == meta.createdDate
              ? `Created & updated on ${meta.createdDate}.`
              : `Created on ${meta.createdDate} & updated on ${meta.updatedDate}.`}
          </Text>
          <HStack>
            {meta.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </HStack>
        </Box>
        <Divider />
        <MDXRemote {...mdx} components={components} lazy />
      </Box>
      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dpath = path.join(process.cwd(), 'posts')
  const pslugs = (await fs.promises.readdir(dpath)).flatMap((p) => {
    if (p.endsWith('.mdx')) {
      return [p.slice(0, -'.mdx'.length)]
    } else if (p.endsWith('.md')) {
      return [p.slice(0, -'.md'.length)]
    } else {
      return []
    }
  })
  const ppaths = pslugs.map((p) => path.join('/', p))
  return { paths: ppaths, fallback: false }
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const ppath = path.join('/', params?.path as string)
  const fpathBase = path.join(process.cwd(), 'posts', ppath)
  let text: string
  let ext = 'mdx'
  try {
    text = (await fs.promises.readFile(fpathBase + '.' + ext)).toString()
  } catch {
    ext = 'md'
    text = (await fs.promises.readFile(fpathBase + '.' + ext)).toString()
  }
  // @ts-ignore For complicated plugin options
  let mdx = await serialize(text, { mdxOptions: { remarkPlugins, rehypePlugins, format: ext }, parseFrontmatter: true })
  // Frontmatter could not be parsed if containing Date object
  const meta = getMeta(mdx.frontmatter as any as Frontmatter)
  delete mdx.frontmatter
  return { props: { mdx, meta, ppath } }
}

export default Post
