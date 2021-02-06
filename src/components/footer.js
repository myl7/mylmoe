import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import cc from '../images/cc/cc.svg'
import by from '../images/cc/by.svg'
import nc from '../images/cc/nc.svg'
import sa from '../images/cc/sa.svg'
import ExtLinkRel from './links/extLinkRel'
import ExtLink from './links/extLink'
import IntLink from './links/intLink'

const moeCode = '20210016'

const Footer = () => {
  return (
    <Card component="footer" variant="outlined" style={{margin: '1em'}}>
      <CardContent>
        <Typography variant="body1">
          Copyright (c) 2020-2021 myl7 | {''}
          Posts use {''}
          <ExtLinkRel rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            CC-BY-NC-SA 4.0
          </ExtLinkRel>
          {' '}
          <ExtLinkRel rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            <img src={cc} alt="CC icon of CC license" height="22px !important" style={{verticalAlign: 'text-bottom'}} />
            <img src={by} alt="BY icon of CC license" height="22px !important" style={{verticalAlign: 'text-bottom'}} />
            <img src={nc} alt="NC icon of CC license" height="22px !important" style={{verticalAlign: 'text-bottom'}} />
            <img src={sa} alt="SA icon of CC license" height="22px !important" style={{verticalAlign: 'text-bottom'}} />
          </ExtLinkRel>
          , code uses MIT, unless otherwise stated | {''}
          Released on {''}
          <ExtLink href="https://github.com/myl7/mylmoe">
            myl7/mylmoe@GitHub
          </ExtLink>
        </Typography>
        <Typography variant="body1">
          <ExtLink href="https://icp.gov.moe">
            萌ICP备
          </ExtLink>
          {' '}
          <ExtLink href={'https://icp.gov.moe/?keyword=' + moeCode}>
            {moeCode}号
          </ExtLink>
          {' | '}
          <ExtLink href="https://icons8.com/icons/set/code">
            Code icon
          </ExtLink>
          {''} icon by {''}
          <ExtLink href="https://icons8.com">
            Icons8
          </ExtLink>
        </Typography>
        <Typography variant="body1">
          <IntLink to="/privacy-policy">
            Privacy Policy
          </IntLink>
          {' | '}
          <IntLink to="/about">
            About
          </IntLink>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Footer
