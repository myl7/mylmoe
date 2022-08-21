// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Heading, HStack, Tag, Text, VStack, Link } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path/posix'
import fs from 'fs'
import Footer from '../components/footer'
import Header from '../components/header'
import { getMeta, type Meta } from '../utils/post'
import colorHooks from '../utils/colors'
import { rehypePlugins, remarkPlugins } from '../utils/mdx'
import type { Frontmatter } from '../posts'

interface IndexProps {
  pmetas: { meta: Meta; ppath: string }[]
}

const Home: NextPage<IndexProps> = ({ pmetas }) => {
  return (
    <div>
      <Head>
        <title>mylmoe</title>
        <meta name="description" content="myl7's blog & utils" />
        <link rel="canonical" href="https://myl.moe" />
      </Head>
      <Header />
      <VStack as="main" px={2} pb={2} alignItems="flex-start">
        {pmetas.map(PItem)}
      </VStack>
      <Footer />
    </div>
  )
}

type PItemProps = IndexProps['pmetas'][number]

function PItem(props: PItemProps) {
  const colors = {
    textColor: colorHooks.useTextColor(),
  }
  const { meta, ppath } = props
  const pslug = ppath.substring(1)

  return (
    <Box
      key={pslug}
      id={pslug}
      as="article"
      borderRadius="md"
      borderWidth={1.5}
      borderColor={colors.textColor}
      px={4}
      py={2}
    >
      <Heading as="h2" size="md">
        <NextLink href={ppath} passHref>
          <Link>{meta.title}</Link>
        </NextLink>
      </Heading>
      <Text>
        <NextLink href={ppath} passHref>
          <Link>{meta.abstract}</Link>
        </NextLink>
      </Text>
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
  )
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
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

  const pmetas = [] as { meta: Meta; ppath: string }[]
  for (const ppath of ppaths) {
    const fpathBase = path.join(process.cwd(), 'posts', ppath)
    let text: string
    let ext = 'mdx'
    try {
      text = (await fs.promises.readFile(fpathBase + '.' + ext)).toString()
    } catch {
      ext = 'md'
      text = (await fs.promises.readFile(fpathBase + '.' + ext)).toString()
    }
    const mdx = await serialize(text, {
      // @ts-ignore
      mdxOptions: { remarkPlugins, rehypePlugins, format: ext },
      parseFrontmatter: true,
    })
    const meta = getMeta(mdx.frontmatter as any as Frontmatter)
    pmetas.push({ meta, ppath })
  }
  return { props: { pmetas } }
}

export default Home
