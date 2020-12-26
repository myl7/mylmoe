import React, {forwardRef} from 'react'
import {Link, makeStyles} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'

const useStyles = makeStyles({
  link: {
    textDecoration: 'underline'
  }
})

export default forwardRef((props, ref) => {
  const classes = useStyles()

  return (<Link className={classes.link} component={RouterLink} {...props} ref={ref} />)
})
