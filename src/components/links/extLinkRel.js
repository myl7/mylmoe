import React, {forwardRef} from 'react'
import {Link} from '@material-ui/core'

const ExtLinkRel = forwardRef((props, ref) => {
  return <Link target="_blank" ref={ref} {...props} />
})

export default ExtLinkRel
