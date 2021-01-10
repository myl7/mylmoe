import React from 'react'
import {Card, CardContent, makeStyles, Typography} from '@material-ui/core'
import ExternalLink from './ExternalLink'

const useStyles = makeStyles({
  ccIcon: {
    height: '22px !important',
    marginLeft: '3px',
    verticalAlign: 'text-bottom'
  },
  footerText: {
    marginTop: 0,
    marginBottom: 0,
    color: '#eeeeee'
  }
})

export default () => {
  const classes = useStyles()

  return (
    <Card component={'footer'} style={{marginTop: '1em', backgroundColor: '#202020', borderRadius: 0}}>
      <CardContent>
        <Typography variant={'body1'} className={classes.footerText}>
          <ExternalLink href={'https://github.com/myl7/mylmoe/tree/goshujin-sama/posts'}>Posts</ExternalLink>
          {' '}are licensed under{' '}
          <ExternalLink rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            CC BY-NC-SA 4.0
            <img className={classes.ccIcon} src="/images/cc/cc.svg"
                 alt="CC" />
            <img className={classes.ccIcon} src="/images/cc/by.svg"
                 alt="BY" />
            <img className={classes.ccIcon} src="/images/cc/nc.svg"
                 alt="NC" />
            <img className={classes.ccIcon} src="/images/cc/sa.svg"
                 alt="SA" />
          </ExternalLink>
        </Typography>
        <Typography variant={'body1'} className={classes.footerText} style={{marginTop: '0.5em'}}>
          Website source{' '}
          <ExternalLink href={'https://github.com/myl7/mylmoe'}>myl7/mylmoe</ExternalLink>
          {' '}is licensed under MIT.
        </Typography>
        <Typography variant={'body1'} className={classes.footerText} style={{marginTop: '0.5em'}}>
          <ExternalLink href="https://icp.gov.moe">萌ICP备</ExternalLink>
          {' '}
          <ExternalLink href="https://icp.gov.moe/?keyword=20210016">20210016号</ExternalLink>
        </Typography>
      </CardContent>
    </Card>
  )
}
