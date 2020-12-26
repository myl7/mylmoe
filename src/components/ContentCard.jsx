import React, {forwardRef} from 'react'
import {Card, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 0
  }
}))

export default forwardRef((props, ref) => {
  const classes = useStyles()

  return (
    <Card className={classes.card} {...props} ref={ref} />
  )
})
