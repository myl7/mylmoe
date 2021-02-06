import React, {forwardRef} from 'react'
import {Link} from '@material-ui/core'

const ExtLink = forwardRef((props, ref) => {
  return <Link target="_blank" rel="noopener" ref={ref} {...props} />
})

export default ExtLink
