import React, {useEffect, useRef, useState} from 'react'
import {Typography, Grid, TextField, Button} from '@material-ui/core'
import init from 'brotli-dec-wasm'
import {brotliDec, brotliEnc} from '../utils/brotli'
import {inputBytes, outputBytes} from '../utils/byteView'
import BodyPage from './BodyPage'

export default () => {
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
    <BodyPage title={'Brotli online encode/decode tool'} subheader={'Use the 2 input boxes to encode/decode.'}
              description={'Maybe the only one on the Internet. Decode uses WASM, and encode uses self-hosting API.'}
              path={'/utils/brotli'}>
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
                    <Button variant={'outlined'} component={'span'}>
                      <Typography variant={'subtitle1'}>
                        {file2enc === null ? 'Upload to encode' : file2enc}
                      </Typography>
                    </Button>
                  </label>
                </Grid>
                <Grid item>
                  <Button variant={'outlined'} onClick={handleEnc}>
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
                  <Button variant={'outlined'} onClick={handleDec}>
                    <Typography variant={'subtitle1'}>
                      Decode
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <input id={'decFile'} type={'file'} hidden onChange={handleUploadFile(setFile2dec)}
                         ref={decFileRef} />
                  <label htmlFor={'decFile'}>
                    <Button variant={'outlined'} component={'span'}>
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
    </BodyPage>
  )
}
