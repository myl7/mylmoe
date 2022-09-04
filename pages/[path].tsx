// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider, Flex, Heading, Tag, Text, useColorMode, VStack } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Helmet } from 'react-helmet-async'
import Giscus from '@giscus/react'
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
import HeadMeta from '../components/headMeta'

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
        <HeadMeta pageMeta={meta} ppath={ppath} />
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
      <Box as="main" px={2} pb={2} w="100%" lang={meta.lang}>
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
          <Giscus
            id="comments"
            repo="myl7/mylmoe"
            repoId="MDEwOlJlcG9zaXRvcnkzMDA4MzYxMzI="
            category="Announcements"
            categoryId="DIC_kwDOEe5lJM4CRLe1"
            mapping="og:title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={colorMode}
            lang="en"
            loading="lazy"
          />
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
