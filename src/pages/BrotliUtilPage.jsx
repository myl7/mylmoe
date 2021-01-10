import React, {useEffect, useRef, useState} from 'react'
import {CardContent, makeStyles, Divider, Typography, Grid, TextField, Button} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import init from 'brotli-dec-wasm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'
import WideDivider from '../components/WideDivider'
import {brotliDec, brotliEnc} from '../utils/brotli'
import {inputBytes, outputBytes} from '../utils/byteView'

const useStyles = makeStyles({
  titleDivider: {
    marginBottom: '1em'
  }
})

export default () => {
  const classes = useStyles()

  const [decInit, setDecInit] = useState(null)

  useEffect(() => {
    setDecInit(init('/wasm/brotli-dec-wasm_bg.wasm'))
  }, [setDecInit])

  const encTextRef = useRef()
  const decTextRef = useRef()

  const [file2enc, setFile2enc] = useState(null)
  const encFileRef = useRef(null)
  const handleEnc = () => {
    const f = encFileRef.current.files[0]
    if (f) {
      f.arrayBuffer().then(buf => {
        brotliEnc(new Uint8Array(buf)).then(res => {
          decTextRef.current.value = outputBytes(res)
        })
      })
    } else if (encTextRef.current.value) {
      brotliEnc(inputBytes(encTextRef.current.value)).then(res => {
        decTextRef.current.value = outputBytes(res)
      })
    }
  }

  const [file2dec, setFile2dec] = useState(null)
  const decFileRef = useRef(null)
  const handleDec = () => {
    const f = decFileRef.current.files[0]
    if (f) {
      f.arrayBuffer().then(buf => {
        brotliDec(new Uint8Array(buf), decInit).then(res => {
          encTextRef.current.value = outputBytes(res)
        })
      })
    } else if (decTextRef.current.value) {
      brotliDec(inputBytes(decTextRef.current.value), decInit).then(res => {
        encTextRef.current.value = outputBytes(res)
      })
    }
  }

  const handleUploadFile = setter => e => {
    setter(e.target.files[0].name)
  }

  return (
    <div>
      <Helmet>
        <title>Brotli online encode/decode tool | mylmoe</title>
        <meta name={'description'}
              content={'mylmoe util page containing brotli decode/encode or decompress/compress tool'} />
      </Helmet>
      <Header />
      <Divider />
      <ContentCard>
        <CardContent>
          <Typography variant={'h4'}>
            Brotli
          </Typography>
          <WideDivider className={classes.titleDivider} />
          <Grid container spacing={2} justify={'center'}>
            <Grid item sm={6} xs={12}>
              <Grid container direction={'column'} alignItems={'stretch'} spacing={2}>
                <Grid item>
                  <TextField label={'To be encoded:'} multiline rowsMax={10} variant={'outlined'} fullWidth
                             inputRef={encTextRef} InputLabelProps={{shrink: true}} />
                </Grid>
                <Grid item>
                  <Grid container justify={'space-around'}>
                    <Grid item>
                      <input id={'encFile'} type={'file'} hidden onChange={handleUploadFile(setFile2enc)}
                             ref={encFileRef} />
                      <label htmlFor={'encFile'}>
                        <Button variant={'outlined'} color={'primary'} component={'span'}>
                          <Typography variant={'subtitle1'}>
                            {file2enc === null ? 'Upload to encode' : file2enc}
                          </Typography>
                        </Button>
                      </label>
                    </Grid>
                    <Grid item>
                      <Button color={'primary'} variant={'outlined'} onClick={handleEnc}>
                        <Typography variant={'subtitle1'}>
                          Encode
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Grid container direction={'column'} alignItems={'stretch'} spacing={2}>
                <Grid item>
                  <TextField label={'To be decoded:'} multiline rowsMax={10} variant={'outlined'} fullWidth
                             inputRef={decTextRef} InputLabelProps={{shrink: true}} />
                </Grid>
                <Grid item>
                  <Grid container justify={'space-around'}>
                    <Grid item>
                      <Button color={'primary'} variant={'outlined'} onClick={handleDec}>
                        <Typography variant={'subtitle1'}>
                          Decode
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <input id={'decFile'} type={'file'} hidden onChange={handleUploadFile(setFile2dec)}
                             ref={decFileRef} />
                      <label htmlFor={'decFile'}>
                        <Button variant={'outlined'} color={'primary'} component={'span'}>
                          <Typography variant={'subtitle1'}>
                            {file2dec === null ? 'Upload to decode' : file2dec}
                          </Typography>
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </ContentCard>
      <Footer />
    </div>
  )
}
