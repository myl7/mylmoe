// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { forwardRef } from 'react'
import { Link, LinkProps } from '@mui/material'
import ExtLinkSign from './extLinkSign'

const ExtLinkRel = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { children, ...others } = props

  return (
    <Link target="_blank" ref={ref} {...others}>
      {children}
      <span className="ext-link">
        <ExtLinkSign />
      </span>
    </Link>
  )
})
ExtLinkRel.displayName = 'ExtLinkRel'

export default ExtLinkRel
