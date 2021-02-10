import React from 'react'
import {Card, Grid, Typography} from '@material-ui/core'

const TextBanner = props => {
  const {text} = props

  return (
    <Grid container justify="center">
      <Grid item>
        <Card variant="outlined" style={{padding: '1em'}}>
          <Typography variant="h4">
            {text}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TextBanner
