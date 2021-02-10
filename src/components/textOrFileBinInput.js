import React, {useState} from 'react'
import {Button, Grid, TextField, Typography} from '@material-ui/core'
import {inputBin} from '../utils/binary'

const TextOrFileBinInput = props => {
  const {textHelp, fileHelp, procHelp, procBin, textRef, fileRef} = props

  const inputId = textHelp.toLowerCase().replace(' ', '-')

  const [filename, setFilename] = useState(null)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    setFilename(file ? file.name : fileHelp)
  }

  const handleClick = () => {
    const text = textRef.current.value
    const file = fileRef.current.files[0]
    if (text) {
      procBin(inputBin(text))
    } else if (file) {
      file.arrayBuffer().then(buf => {
        procBin(new Uint8Array(buf))
      })
    } else {
      procBin(null)
    }
  }

  return (
    <Grid container direction={'column'} alignItems={'stretch'} spacing={2}>
      <Grid item>
        <TextField label={textHelp} multiline rowsMax={10} variant={'outlined'} fullWidth inputRef={textRef}
                   InputLabelProps={{shrink: true}} />
      </Grid>
      <Grid item>
        <Grid container justify={'space-around'}>
          <Grid item>
            <input id={inputId} type={'file'} hidden onChange={handleUpload} ref={fileRef} />
            <label htmlFor={inputId}>
              <Button variant={'outlined'} component={'span'}>
                <Typography variant={'subtitle1'}>
                  {filename === null ? fileHelp : filename}
                </Typography>
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button variant={'outlined'} onClick={handleClick}>
              <Typography variant={'subtitle1'}>
                {procHelp}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TextOrFileBinInput
