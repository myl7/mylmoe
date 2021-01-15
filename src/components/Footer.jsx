import React from 'react'
import {Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core'
import ExternalLink from './ExternalLink'
import RouterLink from './RouterLink'

const useStyles = makeStyles({
  card: {
    margin: '1em'
  },
  ccIcon: {
    height: '22px !important',
    verticalAlign: 'text-bottom'
  }
})

export default () => {
  const classes = useStyles()

  return (
    <Card component={'footer'} className={classes.card} elevation={3}>
      <CardContent>
        <Typography variant={'body1'}>
          Copyright (c) 2020-2021 myl7,{' '}
          <ExternalLink href={'https://github.com/myl7/mylmoe/tree/goshujin-sama/works/posts'}>
            posts
          </ExternalLink>
          {' '}and{' '}
          <ExternalLink href={'https://github.com/myl7/mylmoe/tree/goshujin-sama/works/ideas'}>
            ideas
          </ExternalLink>
          {' '}use{' '}
          <ExternalLink rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            CC BY-NC-SA 4.0 license
          </ExternalLink>
          {' '}
          <ExternalLink rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            <img className={classes.ccIcon} src="/images/cc/cc.svg" alt="CC" />
            <img className={classes.ccIcon} src="/images/cc/by.svg" alt="BY" />
            <img className={classes.ccIcon} src="/images/cc/nc.svg" alt="NC" />
            <img className={classes.ccIcon} src="/images/cc/sa.svg" alt="SA" />
          </ExternalLink>
          , source code{' '}
          <ExternalLink href={'https://github.com/myl7/mylmoe'}>
            myl7/mylmoe
          </ExternalLink>
          {' '}uses MIT license, unless otherwise stated.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant={'body1'}>
              <ExternalLink href="https://icp.gov.moe">萌ICP备</ExternalLink>
              {' '}
              <ExternalLink href="https://icp.gov.moe/?keyword=20210016">20210016号</ExternalLink>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'body1'}>
              <RouterLink to={'/pages/privacy-policy'}>Privacy Policy</RouterLink>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
