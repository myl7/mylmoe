import React, {useRef, useState} from 'react'
import {CardContent, CardHeader, Divider, Grid, TextField, Typography} from '@material-ui/core'
import BinInput from '../../components/binInput'
import {printBin} from '../../utils/bin'
import Head from '../../components/head'
import {brotliEnc} from '../../api/brotli'

const Brotli = () => {
  const encTextRef = useRef<HTMLInputElement>(null)
  const encFileRef = useRef<HTMLInputElement>(null)
  const encResRef = useRef<HTMLInputElement>(null)
  const decTextRef = useRef<HTMLInputElement>(null)
  const decFileRef = useRef<HTMLInputElement>(null)
  const decResRef = useRef<HTMLInputElement>(null)

  const [encStatus, setEncStatus] = useState<'none'|'waiting'|'failed'|'ok'>('none')

  const enc = (arr: Uint8Array|null) => {
    if (arr != null) {
      setEncStatus('waiting')
      brotliEnc(arr).then(res => {
        encResRef.current!.value = printBin(res)
        setEncStatus('ok')
      })
    }
  }
  const dec = (arr: Uint8Array|null) => {
    if (arr != null) {
      import('brotli-dec-wasm').then(({brotliDec}) => {
        const res = brotliDec(arr)
        decResRef.current!.value = printBin(res)
      })
    }
  }

  const title = 'Brotli online encode/decode tool'
  const description = 'Decode locally with WASM via npm package brotli-dec-wasm, and encode remotely with AWS Lambda'

  return (
    <>
      <Head title={title} description={description} path={'/utils/brotli/'} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={description} />
      <Divider />
      <CardContent>
        <Typography variant="body1">
          Input and output support hex string and Python-style string
          e.g. <code>a\xff</code> or <code>b'a\xff'</code>.
        </Typography>
        <Grid container spacing={2} justify={'center'} style={{marginTop: '0.5em'}}>
          <Grid item sm={6} xs={12}>
            <BinInput textHelp="Bytes to decode" fileHelp="File to decode" procHelp="Decode" procBin={dec}
                      textRef={decTextRef} fileRef={decFileRef} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField label="Decoding result" multiline rowsMax={10} variant={'outlined'} fullWidth
                       inputRef={decResRef} InputLabelProps={{shrink: true}} />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify={'center'} style={{marginTop: '0.5em'}}>
          <Grid item sm={6} xs={12}>
            <BinInput textHelp="Bytes to encode" fileHelp="File to encode" procHelp="Encode" procBin={enc}
                      textRef={encTextRef} fileRef={encFileRef} status={encStatus} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField label="Encoding result" multiline rowsMax={10} variant={'outlined'} fullWidth
                       inputRef={encResRef} InputLabelProps={{shrink: true}} />
          </Grid>
        </Grid>
      </CardContent>
    </>
  )
}

export default Brotli