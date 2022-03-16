import { Card, CardContent, Typography } from '@mui/material'
import ExtLink from '../components/links/extLink'
import IntLink from '../components/links/intLink'
import site from './site'
import CcIcons from '../components/ccIcons'

const Footer = () => {
  return (
    <Card component="footer" variant="outlined" style={{ margin: '1em' }}>
      <CardContent>
        <Typography variant="body1">
          Copyright (c) 2020-2022 myl7 | Posts SPDX-License-Identifier: CC-BY-SA-4.0{' '}
          <CcIcons license={'CC-BY-SA 4.0'} /> | Code SPDX-License-Identifier: Apache-2.0 , unless otherwise explicitly
          stated | All resource FOSS on <ExtLink href="https://github.com/myl7/mylmoe">myl7/mylmoe</ExtLink>
        </Typography>
        <Typography variant="body1">
          <ExtLink href="https://icp.gov.moe">萌 ICP 备</ExtLink>{' '}
          <ExtLink href={`https://icp.gov.moe/?keyword=${site.moeCode}`}>{site.moeCode}</ExtLink> 号 | Icons made by{' '}
          <ExtLink href="https://www.freepik.com" title="Freepik">
            Freepik
          </ExtLink>{' '}
          from{' '}
          <ExtLink href="https://www.flaticon.com/" title="Flaticon">
            flaticon.com
          </ExtLink>
        </Typography>
        <Typography variant="body1">
          <IntLink href="/pages/privacy-policy">Privacy Policy</IntLink> | <IntLink href="/pages/about">About</IntLink>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Footer
