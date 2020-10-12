import React from 'react'
import {Link} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'

export default React.forwardRef((props, ref) => {
  const {...others} = props

  return <Link component={RouterLink} {...others} ref={ref} />
})
