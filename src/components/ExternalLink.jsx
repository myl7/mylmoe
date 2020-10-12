import React from 'react'
import {Link} from '@material-ui/core'

export default React.forwardRef((props, ref) => {
  const {...others} = props

  return <Link target={'_blank'} rel={'noopener'} {...others} ref={ref} />
})
