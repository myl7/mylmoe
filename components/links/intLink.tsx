import { Link, LinkProps } from '@mui/material'
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link'
import { FC, forwardRef } from 'react'

const RefLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <Link ref={ref} {...props} />
})
RefLink.displayName = 'RefLink'

const IntLink: FC<NextLinkProps & { linkProps?: LinkProps }> = props => {
  const { children, linkProps, passHref, ...others } = props

  return (
    <NextLink {...others} passHref>
      <RefLink {...linkProps}>{children}</RefLink>
    </NextLink>
  )
}

export default IntLink
