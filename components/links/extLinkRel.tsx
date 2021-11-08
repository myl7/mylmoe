import {forwardRef} from 'react'
import {Link, LinkProps} from '@material-ui/core'
import ExtLinkSign from './extLinkSign'

const ExtLinkRel = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {children, ...others} = props

  return (
    <Link target="_blank" ref={ref} {...others}>
      {children}
      <span className="ext-link">
        <ExtLinkSign />
      </span>
    </Link>
  )
})

export default ExtLinkRel
