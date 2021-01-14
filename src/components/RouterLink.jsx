import React, {forwardRef} from 'react'
import {Link} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'

export default forwardRef((props, ref) => {
  return (<Link component={RouterLink} {...props} ref={ref} />)
})
