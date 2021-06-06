import React, {forwardRef} from 'react'
import {Link, LinkProps} from '@material-ui/core'
import {default as NextLink, LinkProps as NextLinkProps} from 'next/link'

const IntLink = forwardRef<HTMLLinkElement, LinkProps&NextLinkProps>((props, ref) => {
  return <Link component={NextLink} ref={ref} {...props} />
})

export default IntLink
