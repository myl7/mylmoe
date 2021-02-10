import React from 'react'
import {Card, CardContent, CardHeader, Grid} from '@material-ui/core'
import {formatDate} from '../../utils/datetime'
import WIP from '../wip'

const ArcaeaUserInfo = props => {
  const {userInfo, ...others} = props
  // eslint-disable-next-line no-unused-vars
  const {name, user_code, join_date, rating, recent_score, rating_records} = userInfo

  return (
    <Card component="article" variant="outlined" {...others}>
      <CardHeader title={name} titleTypographyProps={{component: 'h2'}} subheader={
        <div>
          ID: {user_code} | {''}
          PTT: {(rating / 100).toFixed(2)} | {' '}
          Join date: {formatDate(join_date)}
        </div>
      } />
      <CardContent>
        <Grid container>
          <Grid item lg={6} xs={12}>
            <WIP />
          </Grid>
          <Grid item lg={6} xs={12}>
            <WIP />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ArcaeaUserInfo
