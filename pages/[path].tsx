// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Divider, Flex, Heading, HStack, Tag, Text, useColorMode, VStack } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Helmet } from 'react-helmet-async'
// These node modules are only used in SSG
import fs from 'fs'
import path from 'path'
import Footer from '../components/footer'
import Header from '../components/header'
import { components } from '../utils/mdx/components'
import { rehypePlugins, remarkPlugins } from '../utils/mdx/plugins'
import { getMeta, getPPathsWithExts, type Meta } from '../utils/posts'
import type { Frontmatter } from '../posts'
import ImageMapContext from '../components/imageMapContext'

interface PostProps {
  mdx: { compiledSource: string; scope?: any }
  meta: Meta
  ppath: string
  imageMap: { [key: string]: any }
}

const Post: NextPage<PostProps> = (props) => {
  const { mdx, meta, ppath, imageMap } = props

  const { colorMode } = useColorMode()

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {meta.abstract && <meta name="description" content={meta.abstract} />}
        <link rel="canonical" href={'https://myl.moe' + ppath} />
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
      <Box as="main" px={2} pb={2} w="100%">
        <VStack px={6} my="12px" spacing={2} alignItems="flex-start">
          <Heading as="h1" size="md">
            {meta.title}
          </Heading>
          <Text>{meta.abstract}</Text>
          <Text fontSize="sm">
            {meta.updatedDate == meta.createdDate
              ? `Created & updated on ${meta.createdDate}.`
              : `Updated on ${meta.updatedDate} & created on ${meta.createdDate}.`}
          </Text>
          <Flex gap={1} flexWrap="wrap">
            {meta.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Flex>
        </VStack>
        <Divider />
        <Box id="post-body" w="100%" px={{ base: 2, md: 8 }}>
          <ImageMapContext.Provider value={imageMap}>
            {/* Error due to isInPre attr, but we can ensure it is always passed from pre to code */}
            {/* @ts-ignore */}
            <MDXRemote {...mdx} components={components} lazy />
          </ImageMapContext.Provider>
          <Comments />
        </Box>
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
  mdx = { compiledSource: mdx.compiledSource, scope: mdx.scope }
  const imageMap = {} // TODO
  return { props: { mdx, meta, ppath, imageMap } }
}

export default Post

const Comments = dynamic(
  async () => () =>
    (
      <>
        <div className="giscus" />
        <Head>
          <script
            src="https://giscus.app/client.js"
            data-repo="myl7/mylmoe"
            data-repo-id="MDEwOlJlcG9zaXRvcnkzMDA4MzYxMzI="
            data-category="Announcements"
            data-category-id="DIC_kwDOEe5lJM4CRLe1"
            data-mapping="title"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme="preferred_color_scheme"
            data-lang="en"
            crossOrigin="anonymous"
            async
          />
        </Head>
      </>
    ),
  { ssr: false }
)
