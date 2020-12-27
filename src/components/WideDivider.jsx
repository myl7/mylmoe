import React, {forwardRef} from 'react'
import {Divider, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  divider: {
    marginTop: '0.5em',
    marginBottom: '0.5em'
  }
})

export default forwardRef((props, ref) => {
  const classes = useStyles()

  return (
    <Divider className={classes.divider} ref={ref} {...props} />
  )
})
