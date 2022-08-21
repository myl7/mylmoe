// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Heading, HStack, Tag, Text, VStack, Link } from '@chakra-ui/react'
import Footer from '../components/footer'
import Header from '../components/header'
import { getMetasWithPPaths, type Meta } from '../utils/posts'
import colorHooks from '../utils/colors'

interface IndexProps {
  metas: { meta: Meta; ppath: string }[]
}

const Home: NextPage<IndexProps> = ({ metas }) => {
  return (
    <div>
      <Head>
        <title>mylmoe</title>
        <meta name="description" content="myl7's blog & utils" />
        <link rel="canonical" href="https://myl.moe" />
      </Head>
      <Header />
      <VStack as="main" px={2} pb={2} alignItems="flex-start">
        {metas.map(PItem)}
      </VStack>
      <Footer />
    </div>
  )
}

type PItemProps = IndexProps['metas'][number]

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
  const metas = await getMetasWithPPaths()
  return { props: { metas } }
}

export default Home
