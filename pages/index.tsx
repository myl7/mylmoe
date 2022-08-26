// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Box,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
  Link,
  Divider,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react'
import Footer from '../components/footer'
import Header from '../components/header'
import { getMetasWithPPaths, type Meta } from '../utils/posts'
import colorHooks from '../utils/colors'

interface IndexProps {
  metas: { [category: string]: { meta: Meta; ppath: string }[] }
}

const Home: NextPage<IndexProps> = ({ metas }) => {
  const { postMetas, miscMetas } = metas

  return (
    <div>
      <Head>
        <title>mylmoe</title>
        <meta name="description" content="myl7's blog & utils" />
        <link rel="canonical" href="https://myl.moe" />
      </Head>
      <Header />
      <VStack as="main" px={2}>
        <Box px={4} pt={2} pb={1}>
          <Heading as="h1" size="md">
            {"Welcome to mylmoe: myl7's blog & utils!"}
          </Heading>
        </Box>
        <Divider />
        <Tabs px={4}>
          <TabList>
            <Tab>
              <Heading size="sm">Posts</Heading>
            </Tab>
            <Tab>
              <Heading size="sm">Utils</Heading>
            </Tab>
            <Tab>
              <Heading size="sm">Misc</Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={2}>{postMetas.map(PItem)}</VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={2}>
                <Item
                  slug="brotli"
                  title="Brotli encode/decode tool"
                  abstract="Encode/decode (a.k.a. compress/decompress) data in Brotli format locally in browser. All processing is literally done locally with WebAssembly to keep data safe."
                  ppath="/brotli"
                />
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={2}>{miscMetas.map(PItem)}</VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      <Footer />
    </div>
  )
}

interface PItemProps {
  meta: Meta
  ppath: string
}

function PItem(props: PItemProps) {
  const { meta, ppath } = props
  const pslug = ppath.substring(1)

  return (
    <Item slug={pslug} title={meta.title} abstract={meta.abstract} ppath={ppath}>
      <Text fontSize="sm">
        {meta.updatedDate == meta.createdDate
          ? `Created & updated on ${meta.createdDate}.`
          : `Created on ${meta.createdDate} & updated on ${meta.updatedDate}.`}
      </Text>
      {meta.tags.length > 0 && (
        <HStack>
          {meta.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </HStack>
      )}
    </Item>
  )
}

interface ItemProps {
  slug: string
  title: string
  abstract: string
  ppath: string
  children?: React.ReactNode
}

function Item(props: ItemProps) {
  const colors = {
    textColor: colorHooks.useTextColor(),
  }

  const { slug, title, abstract, ppath, children } = props

  return (
    <Box
      id={slug}
      key={slug}
      as="article"
      borderRadius="md"
      borderWidth={1.5}
      borderColor={colors.textColor}
      px={4}
      py={2}
    >
      <Heading as="h2" size="md">
        <NextLink href={ppath} passHref>
          <Link>{title}</Link>
        </NextLink>
      </Heading>
      <Text>
        <NextLink href={ppath} passHref>
          <Link>{abstract}</Link>
        </NextLink>
      </Text>
      {children}
    </Box>
  )
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const metas = {
    postMetas: await getMetasWithPPaths(),
    miscMetas: await getMetasWithPPaths(['misc']),
  }
  return { props: { metas } }
}

export default Home
