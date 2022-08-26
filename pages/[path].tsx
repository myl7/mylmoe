// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider, Heading, HStack, Tag, Text, useColorMode } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Helmet } from 'react-helmet-async'
// fs and path are only used in SSG
import fs from 'fs'
import path from 'path'
import Footer from '../components/footer'
import Header from '../components/header'
import { components, rehypePlugins, remarkPlugins } from '../utils/mdx'
import { getMeta, getPPathsWithExts, type Meta } from '../utils/posts'
import type { Frontmatter } from '../posts'

interface PostProps {
  mdx: any
  meta: Meta
  ppath: string
}

const Post: NextPage<PostProps> = (props) => {
  const { mdx, meta, ppath } = props

  const { colorMode } = useColorMode()

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {meta.abstract && <meta name="description" content={meta.abstract} />}
        <link rel="canonical" href={'https://myl.moe' + ppath} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.0/katex.min.css"
          integrity="sha512-Yfxo7zXGaQYyzWNxz8r4s8axNfG4jS3dips8p2HA/wNWmuapakkQiki+/XA3o3Ol+i8WI03cRJVDDUElEtED6g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Helmet>
        {colorMode == 'light' ? (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-light.min.css"
            integrity="sha512-o5v54Kh5PH0dgnf9ei0L+vMRsbm5fvIvnR/XkrZZjN4mqdaeH7PW66tumBoQVIaKNVrLCZiBEfHzRY4JJSMK/Q=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        ) : (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-dark.min.css"
            integrity="sha512-Jk4AqjWsdSzSWCSuQTfYRIF84Rq/eV0G2+tu07byYwHcbTGfdmLrHjUSwvzp5HvbiqK4ibmNwdcG49Y5RGYPTg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        )}
      </Helmet>
      <Header />
      <Box
        as="main"
        px={2}
        pb={2}
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
  const ppaths = (await getPPathsWithExts()).map(({ ppath }) => ppath)
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
  // Meta could not be serialized if containing Date object
  const meta = getMeta(mdx.frontmatter as any as Frontmatter)
  delete mdx.frontmatter
  return { props: { mdx, meta, ppath } }
}

export default Post
