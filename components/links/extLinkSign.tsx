// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { Launch as LaunchIcon } from '@mui/icons-material'
import { FC } from 'react'
import { SvgIconProps } from '@mui/material'

const ExtLinkSign: FC<SvgIconProps> = props => {
  return <LaunchIcon style={{ fontSize: '0.8rem' }} {...props} />
}

export default ExtLinkSign
