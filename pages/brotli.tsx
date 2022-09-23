// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Heading,
  VStack,
  Text,
  Divider,
  Textarea,
  Flex,
  Button,
  Icon,
  Code,
  Link,
  Input,
  IconButton,
  Checkbox,
} from '@chakra-ui/react'
import { MdArrowForwardIos, MdDone, MdLaunch, MdOutlineFileDownload, MdRefresh } from 'react-icons/md'
import Footer from '../components/footer'
import Header from '../components/header'
import colorHooks from '../utils/colors'
import { cleanPageMeta } from '../utils/pageMeta'

const rawPageMeta = {
  title: 'Brotli encode/decode tool working locally in browser',
  abstract:
    'Encode/decode (a.k.a. compress/decompress) data in Brotli format. All processing is literally done locally with WebAssembly to keep data safe.',
}
const ppath = '/brotli'

const Brotli: NextPage = () => {
  // Before loading encoder, `brotli-dec-wasm` which has smaller size would be used for decoding
  // After loading encoder, `brotli-wasm` would be used for both encoding and decoding
  const [encLoaded, setEncLoaded] = React.useState(false)

  const autoLoadEncKey = 'mylmoe-brotli-dec-load-by-default'
  // Compared to `autoLoadEnc`, this one is only loaded once when the page is loaded
  // This meams toggling autoLoadEnc checkbox will not trigger a loading of enc immediately
  const [autoLoadEncInit, setAutoLoadEncInit] = React.useState(false)
  const [autoLoadEnc, setAutoLoadEnc] = React.useState(false)
  useEffect(() => {
    const val = !!localStorage.getItem(autoLoadEncKey)
    setAutoLoadEncInit(val)
    setAutoLoadEnc(val)
  }, [setAutoLoadEncInit, setAutoLoadEnc])
  const saveAutoLoadEnc = (val: boolean) => {
    if (val) {
      localStorage.setItem(autoLoadEncKey, '1')
    } else {
      localStorage.removeItem(autoLoadEncKey)
    }
    setAutoLoadEnc(val)
  }

  const pageMeta = cleanPageMeta(rawPageMeta)

  return (
    <div>
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
      <VStack as="main" px={4} py={2} alignItems="flex-start" maxW="1100px" spacing={1}>
        <Heading as="h1" size="md">
          Brotli encode/decode tool
        </Heading>
        <Text fontSize="sm">
          Encode/decode (a.k.a. compress/decompress) data in Brotli format locally in browser. All processing is
          literally done locally with WebAssembly to keep data safe.
        </Text>
        <Divider />
        <VStack w="100%" alignItems="flex-start" py={2} spacing={2}>
          <Heading as="h2" size="sm">
            Readme: Input & output
          </Heading>
          <Text>
            Text input should be in Python byte string format (e.g. <Code>0\xff\\ = [48, 255, 92]</Code>, which can omit
            surrounded quotes and <Code>b</Code> prefix). Text output will also be in that format. When both text and
            file input exist, file input will be selected. Click the refresh button aside to abort the uploaded file.
          </Text>
        </VStack>
        <Divider />
        <VStack w="100%" spacing={6} py={2}>
          <EncDecPanel op="dec" encLoaded={encLoaded} />
          <Divider />
          <EncDecPanel op="enc" encLoaded={encLoaded} setEncLoaded={setEncLoaded} autoLoadEnc={autoLoadEncInit} />
        </VStack>
        <Checkbox isChecked={autoLoadEnc} onChange={(e) => saveAutoLoadEnc(e.target.checked)} pt={2}>
          Load encoder by default
        </Checkbox>
      </VStack>
      <Footer />
    </div>
  )
}

interface EncDecPanelProps {
  op: 'enc' | 'dec'
  encLoaded: boolean
  setEncLoaded?: React.Dispatch<React.SetStateAction<boolean>>
  autoLoadEnc?: boolean
}

const MAX_TEXT_OUTPUT_LEN = 1000

function EncDecPanel(props: EncDecPanelProps) {
  const colors = {
    textColor: colorHooks.useTextColor(),
    paleTextColor: colorHooks.usePaleTextColor(),
    linkColor: colorHooks.useLinkColor(),
  }

  const { op, encLoaded, setEncLoaded, autoLoadEnc } = props
  const opNameLower = op == 'dec' ? 'decode' : 'encode'
  const opNameCapitalized = op == 'dec' ? 'Decode' : 'Encode'

  const [loading, setLoading] = React.useState(false) // loading is always checked with loaded
  const loaded = op == 'dec' || encLoaded

  const inputTextRef = React.useRef<HTMLTextAreaElement>(null)
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const outputTextRef = React.useRef<HTMLTextAreaElement>(null)
  const [outputFile, setOutputFile] = React.useState<Blob>()

  const onProcess = async () => {
    let inputB: Uint8Array
    const inputF = inputFileRef.current?.files?.[0]
    if (inputF) {
      inputB = new Uint8Array(await inputF.arrayBuffer())
    } else {
      const input = inputTextRef.current?.value
      if (!input) {
        return
      }
      inputB = pyS2B(input)
    }

    let outputB: Uint8Array
    if (op == 'dec') {
      try {
        if (encLoaded) {
          const { decompress } = await (await import('brotli-wasm')).default
          outputB = decompress(inputB)
        } else {
          const { brotliDec } = await import(/* webpackMode: "eager" */ 'brotli-dec-wasm')
          outputB = brotliDec(inputB)
        }
      } catch (e) {
        // throw new Error('Failed to decode the input')
        throw e
      }
    } else {
      if (!encLoaded) {
        throw new Error('Encoder has not been loaded')
      }
      try {
        const { compress } = await (await import('brotli-wasm')).default
        outputB = compress(inputB)
      } catch (e) {
        // throw new Error('Failed to encode the input')
        throw e
      }
    }

    setOutputFile(new Blob([outputB]))
    if (outputB.length > MAX_TEXT_OUTPUT_LEN) {
      outputTextRef.current!.value =
        '[Output is too long (> 1KB). Use the button below to download file to view the result.]'
    } else {
      const output = pyB2S(outputB)
      outputTextRef.current!.value = output
    }
  }

  const loadEnc = async () => {
    setLoading(true)
    await import('brotli-wasm')
    setEncLoaded!(true) // loadEnc is not triggerred in dec panel
  }

  const loadRef = React.useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (op == 'enc' && autoLoadEnc && !loaded && loadRef.current) {
      loadRef.current.click()
    }
  }, [op, autoLoadEnc, loaded])

  return (
    <VStack w="100%" alignItems="flex-start" spacing={3}>
      <Heading as="h2" size="sm">
        {opNameCapitalized}
      </Heading>
      {op == 'dec' ? (
        <Text>
          Decoding is provided by{' '}
          <Link textColor={colors.linkColor} href="https://github.com/myl7/brotli-dec-wasm">
            brotli-dec-wasm
            <Icon as={MdLaunch} w={3} h={3} />
          </Link>{' '}
          initially due to its small size. After loading encoder, both decoding and encoding would be provided by{' '}
          <Link textColor={colors.linkColor} href="https://github.com/httptoolkit/brotli-wasm">
            brotli-wasm
            <Icon as={MdLaunch} w={3} h={3} />
          </Link>
          .
        </Text>
      ) : (
        <Text>
          Encoding is disabled by default due to its large size. Click <Code>To load</Code> button below to load encoder
          before encoding. Select <Code>Load encoder by default</Code> checkbox below to change the default loading
          strategy of encoder (by setting/removing a key <Code>mylmoe-brotli-dec-load-by-default</Code> in
          localStorage).
        </Text>
      )}
      <Flex w="100%" maxW="1500px" gap="5%" wrap={{ base: 'wrap', md: 'nowrap' }}>
        <VStack alignItems="flex-start" spacing={2} w="50%">
          <VStack alignItems="flex-start" spacing={0} w="100%">
            <Text>{`Data to be ${opNameLower}d:`}</Text>
            <Textarea
              placeholder={`Data to be ${opNameLower}d`}
              borderColor={colors.textColor}
              _placeholder={{ color: colors.paleTextColor }}
              ref={inputTextRef}
            />
          </VStack>
          <Flex gap={2} alignItems="center">
            {`Or select file to ${opNameLower}:`}
            <Input size="sm" type="file" w="fit-content" pt={'2px'} borderRadius="md" ref={inputFileRef} />
            <IconButton
              size="sm"
              aria-label="Reset file selector state"
              icon={<Icon as={MdRefresh} w={3} h={3} />}
              onClick={() => inputFileRef.current && (inputFileRef.current.value = '')}
            />
          </Flex>
        </VStack>
        <VStack pt="30px">
          <Button
            size="sm"
            disabled={loaded || loading}
            isLoading={!loaded && loading}
            loadingText="Loading"
            leftIcon={<Icon as={loaded ? MdDone : MdOutlineFileDownload} />}
            onClick={loadEnc}
            ref={loadRef}
          >
            {loaded ? 'Loaded' : 'To load'}
          </Button>
          <Button disabled={!loaded} size="sm" rightIcon={<Icon as={MdArrowForwardIos} />} onClick={onProcess}>
            {opNameCapitalized}
          </Button>
        </VStack>
        <VStack alignItems="flex-start" spacing={2} w="50%">
          <VStack alignItems="flex-start" spacing={0} w="100%">
            <Text>Result:</Text>
            <Textarea
              placeholder="Result"
              borderColor={colors.textColor}
              _placeholder={{ color: colors.paleTextColor }}
              ref={outputTextRef}
            />
          </VStack>
          <Button size="sm" onClick={() => outputFile && dlFile(outputFile)}>
            Download result file
          </Button>
        </VStack>
      </Flex>
    </VStack>
  )
}

export default Brotli

function pyB2S(arr: Uint8Array) {
  let res = ''
  for (const i of Array.from(arr)) {
    if (i === 0x5c) {
      res += '\\\\'
    } else if (i === 0x27) {
      res += "\\'"
    } else if (0x20 <= i && i <= 0x7e) {
      res += String.fromCharCode(i)
    } else {
      res += '\\x' + i.toString(16).padStart(2, '0')
    }
  }
  res = "b'" + res + "'"
  return res
}

function pyS2B(s: string) {
  let m
  if ((m = /^b['"](.*)['"]/.exec(s))) {
    s = m[1]
  }
  const arr = []
  while (s) {
    if ((m = /^\\x([0-9a-fA-F]{2})/.exec(s))) {
      s = s.substring(4)
      arr.push(parseInt(m[1], 16))
    } else if (s.substring(0, 2) == '\\\\') {
      arr.push(s[0].charCodeAt(0))
      s = s.substring(2)
    } else {
      arr.push(s[0].charCodeAt(0))
      s = s.substring(1)
    }
  }
  return new Uint8Array(arr)
}

function dlFile(f: Blob, fname?: string) {
  const url = window.URL.createObjectURL(f)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.download = fname ? fname : 'result'
  a.href = url
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}
