import React from 'react'
import {Button, CircularProgress} from '@material-ui/core'

const WaitButton = props => {
  const {size = 25, wait, ...others} = props

  return (
    <>
      <Button style={{display: 'inline-block', verticalAlign: 'middle'}} {...others} />
      {wait ? (
        <CircularProgress style={{display: 'inline-block', marginLeft: '1em', verticalAlign: 'middle'}} size={size} />
      ) : ''}
    </>
  )
}

export default WaitButton
