import React, {forwardRef} from 'react'
import {Link} from '@material-ui/core'
import {Link as GatsbyLink} from 'gatsby'

const IntLink = forwardRef((props, ref) => {
  return <Link component={GatsbyLink} ref={ref} {...props} />
})

export default IntLink
