// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Box,
  Heading,
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
  Flex,
  Button,
} from '@chakra-ui/react'
import Footer from '../components/footer'
import Header from '../components/header'
import { getMetasWithPPaths, type Meta } from '../utils/posts'
import colorHooks from '../utils/colors'
import { cleanPageMeta } from '../utils/pageMeta'

interface IndexProps {
  metas: { [category: string]: { meta: Meta; ppath: string }[] }
}

const rawPageMeta = {
  title: 'mylmoe',
  abstract: "myl7's blog & utils",
}
const ppath = '/'

const Home: NextPage<IndexProps> = ({ metas }) => {
  const { postMetas, miscMetas } = metas

  const pageMeta = cleanPageMeta(rawPageMeta)

  return (
    <div>
      {/* key="pageMeta" is required for no duplicated og meta */}
      <Head key="pageMeta">
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.abstract} />
        <link rel="canonical" href={'https://myl.moe' + ppath} />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:type" content={pageMeta.type} />
        <meta property="og:url" content={'https://myl.moe' + ppath} />
        <meta property="og:image" content={pageMeta.image} />
        <meta property="og:description" content={pageMeta.abstract} />
        <meta property="og:locale" content={pageMeta.locale} />
        <meta property="og:site_name" content="mylmoe" />
      </Head>
      <Header />
      <VStack as="main" px={2} alignItems={{ base: 'center', md: 'flex-start' }}>
        <VStack px={4} alignItems="flex-start">
          <Heading as="h1" size="md" pt={2}>
            {"Welcome to mylmoe: myl7's blog & utils!"}
          </Heading>
          <Flex wrap="wrap" gap={1}>
            <NextLink href="/myl7" passHref>
              <Button as={Link} size="sm" variant="outline">
                About me
              </Button>
            </NextLink>
          </Flex>
        </VStack>
        <Divider />
        <Tabs px={4} w="100%">
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
    <Item slug={pslug} key={pslug} title={meta.title} abstract={meta.abstract} ppath={ppath}>
      <Text fontSize="sm">
        {meta.updatedDate == meta.createdDate
          ? `Created & updated on ${meta.createdDate}.`
          : `Updated on ${meta.updatedDate} & Created on ${meta.createdDate}.`}
      </Text>
      {meta.tags.length > 0 && (
        <Flex gap={1} flexWrap="wrap">
          {meta.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Flex>
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
      w="100%"
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
