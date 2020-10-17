import React from 'react'
import {Box, Typography} from '@material-ui/core'
import dayjs from 'dayjs'

export default (props) => {
  const {userInfo} = props

  return (
    <Typography variant={'body1'}>
      <Typography component={'span'} variant={'h5'}>
        {userInfo.name}
      </Typography>
      {' '}
      <Box component={'span'} fontWeight={'fontWeightLight'}>
        {userInfo.code}
      </Box>
      {' '}| PTT {userInfo.ptt / 100} | Join at{' '}
      {dayjs.utc(userInfo.join_date).local().format('YYYY-MM-DD HH:mm:ss')}
    </Typography>
  )
}
