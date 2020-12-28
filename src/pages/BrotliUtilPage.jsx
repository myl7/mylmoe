import React, {useRef, useState} from 'react'
import {CardContent, makeStyles, Divider, Typography, Grid, TextField, Button, debounce} from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'
import WideDivider from '../components/WideDivider'
import {brotliDec} from '../utils/brotli'
import {inputBytes, outputBytes} from '../utils/byteView'

const useStyles = makeStyles({
  titleDivider: {
    marginBottom: '1em'
  }
})

export default () => {
  const classes = useStyles()

  const [text2enc, setText2enc] = useState('')
  const [file2enc, setFile2enc] = useState(null)
  const input2encRef = useRef(null)
  const handleEnc = () => {
    const f = input2encRef.current.files[0]
    const brotliEnc = async arr => arr // Mock
    if (f) {
      f.arrayBuffer().then(buf => {
        brotliEnc(new Uint8Array(buf)).then(res => {
          setText2dec(outputBytes(res))
        })
      })
    } else if (text2enc) {
      brotliEnc(inputBytes(text2enc)).then(res => {
        setText2dec(outputBytes(res))
      })
    }
  }

  const [text2dec, setText2dec] = useState('')
  const [file2dec, setFile2dec] = useState(null)
  const input2decRef = useRef(null)
  const handleDec = () => {
    const f = input2decRef.current.files[0]
    if (f) {
      f.arrayBuffer().then(buf => {
        brotliDec(new Uint8Array(buf)).then(res => {
          setText2enc(outputBytes(res))
        })
      })
    } else if (text2dec) {
      brotliDec(inputBytes(text2dec)).then(res => {
        setText2enc(outputBytes(res))
      })
    }
  }

  const handleUploadFile = setter => e => {
    setter(e.target.files[0].name)
  }

  const handleTextEdit = setter => e => {
    debounce(setter, 0.4)(e.target.value)
  }

  return (
    <div>
      <Header />
      <Divider />
      <ContentCard>
        <CardContent>
          <Typography variant={'h4'}>
            Brotli
          </Typography>
          <WideDivider className={classes.titleDivider} />
          <Grid container spacing={2} justify={'center'}>
            <Grid item xs={6} xl={12}>
              <Grid container direction={'column'} alignItems={'stretch'} spacing={2}>
                <Grid item>
                  <TextField label={'To be encoded:'} multiline rowsMax={10} variant={'outlined'} fullWidth
                             value={text2enc} onChange={handleTextEdit(setText2enc)} />
                </Grid>
                <Grid item>
                  <Grid container justify={'space-around'}>
                    <Grid item>
                      <input id={'encFile'} type={'file'} hidden onChange={handleUploadFile(setFile2enc)}
                             ref={input2encRef} />
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
            <Grid item xs={6} xl={12}>
              <Grid container direction={'column'} alignItems={'stretch'} spacing={2}>
                <Grid item>
                  <TextField label={'To be decoded:'} multiline rowsMax={10} variant={'outlined'} fullWidth
                             value={text2dec} onChange={handleTextEdit(setText2dec)} />
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
                             ref={input2decRef} />
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
