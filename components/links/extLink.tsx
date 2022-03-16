// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { forwardRef } from 'react'
import { Link, LinkProps } from '@mui/material'
import ExtLinkSign from './extLinkSign'

const ExtLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { children, ...others } = props

  return (
    <Link target="_blank" rel="noopener" ref={ref} {...others}>
      {children}
      <span className="ext-link">
        <ExtLinkSign />
      </span>
    </Link>
  )
})
ExtLink.displayName = 'ExtLink'

export default ExtLink
