import {Grid} from '@material-ui/core'
import React from 'react'
import ArcaeaSong from './ArcaeaSong'

export default (props) => {
  let {songs} = props

  return (
    <Grid container spacing={2}>
      {songs.map(song => <ArcaeaSong key={song.id} song={song} />)}
    </Grid>
  )
}
