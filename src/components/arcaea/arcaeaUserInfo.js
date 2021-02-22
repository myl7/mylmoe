import React from 'react'
import {Card, CardContent, CardHeader, Grid} from '@material-ui/core'
import {formatDate} from '../../utils/datetime'
import ArcaeaScore from './arcaeaScore'
import ArcaeaPttHistory from './arcaeaPttHistory'

const ArcaeaUserInfo = props => {
  const {userInfo, songTitle, ...others} = props
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
        <Grid container spacing={2} justify="center">
          <Grid item>
            {recent_score[0] ? (
              <ArcaeaScore songTitle={songTitle} start={true} score={recent_score[0]} titlePrefix={'Recent: '} />
            ) : ''}
          </Grid>
          <Grid item>
            <ArcaeaPttHistory rating_records={rating_records} currentPtt={rating / 100} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ArcaeaUserInfo
