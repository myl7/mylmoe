// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React, { useRef, useState } from 'react'
import { CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import BinInput from '../../components/utils/binInput'
import { printBin } from '../../utils/bin'
import Head from '../../components/head'
import { brotliEnc } from '../../extern/brotli'
import BinOutput from '../../components/utils/binOutput'
import head from '../../content/head'

const Brotli = () => {
  const encTextRef = useRef<HTMLInputElement>(null)
  const encFileRef = useRef<HTMLInputElement>(null)
  const encResRef = useRef<HTMLInputElement>(null)
  const [encResFile, setEncResFile] = useState<Blob>()

  const decTextRef = useRef<HTMLInputElement>(null)
  const decFileRef = useRef<HTMLInputElement>(null)
  const decResRef = useRef<HTMLInputElement>(null)
  const [decResFile, setDecResFile] = useState<Blob>()

  const [encStatus, setEncStatus] = useState<'none' | 'waiting' | 'failed' | 'ok'>('none')

  const enc = (arr: Uint8Array | null) => {
    if (arr != null) {
      setEncStatus('waiting')
      brotliEnc(new Blob([arr])).then(b => {
        b.arrayBuffer().then(buf => {
          const res = new Uint8Array(buf)
          encResRef.current!.value = printBin(res)
          setEncResFile(new Blob([res.buffer], { type: 'application/octet-stream' }))
          setEncStatus('ok')
        })
      })
    }
  }
  const dec = (arr: Uint8Array | null) => {
    if (arr != null) {
      import('brotli-dec-wasm').then(({ brotliDec }) => {
        const res = brotliDec(arr)
        decResRef.current!.value = printBin(res)
        setDecResFile(new Blob([res.buffer], { type: 'application/octet-stream' }))
      })
    }
  }

  const h = head['/utils/brotli']

  return (
    <>
      <Head {...h} path={'/utils/brotli/'} />
      <CardHeader title={h.title} titleTypographyProps={{ component: 'h1' }} subheader={h.description} />
      <Divider />
      <CardContent>
        <Typography variant="body1">
          Input and output support hex string and Python-style string e.g. <code>a\xff</code> or{' '}
          <code>b&apos;a\xff&apos;</code>.
        </Typography>
        <Grid container spacing={2} justifyContent={'center'} style={{ marginTop: '0.5em' }}>
          <Grid item sm={6} xs={12}>
            <BinInput
              textHelp="Bytes to decode"
              fileHelp="File to decode"
              procHelp="Decode"
              procBin={dec}
              textRef={decTextRef}
              fileRef={decFileRef}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <BinOutput textHelp={'Decoding result'} textRef={decResRef} file={decResFile} />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent={'center'} style={{ marginTop: '0.5em' }}>
          <Grid item sm={6} xs={12}>
            <BinInput
              textHelp="Bytes to encode"
              fileHelp="File to encode"
              procHelp="Encode"
              procBin={enc}
              textRef={encTextRef}
              fileRef={encFileRef}
              status={encStatus}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <BinOutput textHelp={'Encoding result'} textRef={encResRef} file={encResFile} />
          </Grid>
        </Grid>
      </CardContent>
    </>
  )
}

export default Brotli
