import {forwardRef} from 'react'
import {Link, LinkProps} from '@material-ui/core'

const ExtLinkRel = forwardRef<HTMLLinkElement, LinkProps>((props, ref) => {
  return <Link target="_blank" ref={ref} {...props} />
})

export default ExtLinkRel
