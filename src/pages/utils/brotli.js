import React, {useEffect, useRef, useState} from 'react'
import Layout from '../../components/layout'
import {CardContent, CardHeader, Divider, Grid} from '@material-ui/core'
import TextOrFileBinInput from '../../components/textOrFileBinInput'
import {printBin} from '../../utils/binary'
import {graphql, useStaticQuery} from 'gatsby'
import init, {brotliDec} from '../../utils/brotli'
import HtmlHead from '../../components/htmlHead'
import {brotliEnc} from '../../api/brotli'
import {useDispatch, useSelector} from 'react-redux'
import {brotliInitAction} from '../../redux/brotliRedux'

const BrotliPage = () => {
  const encTextRef = useRef()
  const encFileRef = useRef()
  const decTextRef = useRef()
  const decFileRef = useRef()

  const dispatch = useDispatch()

  const brotliInit = useSelector(state => state.brotli.init)

  const data = useStaticQuery(graphql`
    query BrotliQuery {
      file(relativePath: {eq: "brotli-dec-wasm_bg.wasm"}) {
        publicURL
      }
    }
  `)
  const brotliUrl = data.file.publicURL

  useEffect(() => {
    if (!brotliInit) {
      dispatch(brotliInitAction(init(brotliUrl)))
    }
  })

  const [encWait, setEncWait] = useState(false)

  const enc = arr => {
    if (arr === null) {
      decTextRef.current.value = ''
    } else {
      const timer = setTimeout(() => setEncWait(true), 1000)
      brotliEnc(arr).then(res => {
        decTextRef.current.value = printBin(res)
        clearTimeout(timer)
        setEncWait(false)
      })
    }
  }
  const dec = arr => {
    if (arr === null) {
      encTextRef.current.value = ''
    } else {
      brotliInit.then(() => {
        const res = brotliDec(arr)
        encTextRef.current.value = printBin(res)
      })
    }
  }

  const title = 'Brotli online encode/decode tool'
  const description = 'Decode locally with WASM by npm package brotli-dec-wasm, ' +
    'and encode remotely with Azure Functions App.'

  return (
    <Layout>
      <HtmlHead title={title} description={description} path={'/utils/brotli'} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={description} />
      <Divider />
      <CardContent>
        <Grid container spacing={2} justify={'center'}>
          <Grid item sm={6} xs={12}>
            <TextOrFileBinInput textHelp="Text to encode" fileHelp="File to encode" procHelp="Encode" procBin={enc}
                                textRef={encTextRef} fileRef={encFileRef} wait={encWait} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextOrFileBinInput textHelp="Text to decode" fileHelp="File to decode" procHelp="Decode" procBin={dec}
                                textRef={decTextRef} fileRef={decFileRef} wait={false} />
          </Grid>
        </Grid>
      </CardContent>
    </Layout>
  )
}

export default BrotliPage
