import React from 'react'
import ExternalLink from '../components/ExternalLink'
import RouterLink from '../components/RouterLink'

const AutoA = (props) => {
  const {href, ...others} = props

  if (href.startsWith('/')) {
    return <RouterLink to={href} {...others} />
  } else {
    return <ExternalLink href={href} {...others} />
  }
}

export const md2jsxOptions = {
  overrides: {
    a: AutoA
  }
}
