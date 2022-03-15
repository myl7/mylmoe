import React, { FC, RefObject, useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { inputBin } from '../../utils/bin'
import StatusButton from './statusButton'

export interface BinInputProps {
  textHelp: string
  fileHelp: string
  procHelp: string
  procBin: (arr: Uint8Array | null) => void
  textRef: RefObject<HTMLInputElement>
  fileRef: RefObject<HTMLInputElement>
  status?: 'none' | 'waiting' | 'failed' | 'ok'
}

const BinInput: FC<BinInputProps> = props => {
  const { textHelp, fileHelp, procHelp, procBin, textRef, fileRef, status = 'none' } = props

  const inputId = textHelp.toLowerCase().replace(' ', '-')

  const [filename, setFilename] = useState<string | null>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]!
    setFilename(file ? file.name : fileHelp)
  }

  const handleClick = () => {
    if (status == 'waiting') {
      return
    }
    const text = textRef.current!.value
    const file = fileRef.current!.files![0]!
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
        <TextField
          label={textHelp}
          multiline
          maxRows={10}
          variant={'outlined'}
          fullWidth
          inputRef={textRef}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item>
        <Grid container justifyContent={'space-around'}>
          <Grid item>
            <input id={inputId} type={'file'} hidden onChange={handleUpload} ref={fileRef} />
            <label htmlFor={inputId}>
              <Button variant={'outlined'} component={'span'}>
                <Typography variant={'subtitle1'}>{filename == null ? fileHelp : filename}</Typography>
              </Button>
            </label>
          </Grid>
          <Grid item>
            <StatusButton variant={'outlined'} onClick={handleClick} status={status}>
              <Typography variant={'subtitle1'}>{procHelp}</Typography>
            </StatusButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BinInput
