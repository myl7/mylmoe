import React, { FC, RefObject } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'

export interface BinOutputProps {
  textHelp: string
  textRef: RefObject<HTMLInputElement>
  file?: Blob
  filename?: string
}

const BinOutput: FC<BinOutputProps> = props => {
  const { textHelp, textRef, file, filename } = props

  const handleClick = () => {
    if (file) {
      const url = window.URL.createObjectURL(file)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.download = filename ? filename : 'result'
      a.href = url
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
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
            <Button variant={'outlined'} onClick={handleClick}>
              <Typography variant={'subtitle1'}>Download result</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BinOutput
