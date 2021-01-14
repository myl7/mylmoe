import React, {forwardRef} from 'react'
import {Link} from '@material-ui/core'

export default forwardRef((props, ref) => {
  return (<Link target={'_blank'} rel={'noopener'} {...props} ref={ref} />)
})
