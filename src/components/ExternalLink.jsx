import React, {forwardRef} from 'react'
import {Link, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  link: {
    textDecoration: 'underline'
  }
})

export default forwardRef((props, ref) => {
  const classes = useStyles()

  return (<Link className={classes.link} target={'_blank'} rel={'noopener'} {...props} ref={ref} />)
})
