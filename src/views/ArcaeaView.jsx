import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, Typography, Box} from '@material-ui/core'
import arcaeaProberApi from '../apis/arcaeaProberApi'
import ArcaeaSongStatusList, {drawCountCharts, drawHealthCharts} from '../components/ArcaeaSongStatusList'
import dayjs from 'dayjs'

export default () => {
  const [arcaeaProberData, setArcaeaProberData] = useState({
    songs: [], user_info: {name: null, code: null, ptt: null, join_date: null}
  })

  useEffect(() => {
    arcaeaProberApi().then(data => {
      setArcaeaProberData(data)

      const countChartElems = document.querySelectorAll('div.echart-pie')
      drawCountCharts(countChartElems, data.songs)

      const healthChartElems = document.querySelectorAll('div.echart-bar')
      drawHealthCharts(healthChartElems, data.songs)
    })
  }, [])

  const data = arcaeaProberData
  return (
    <Card>
      <CardContent>
        <Typography variant={'h4'}>
          Arcaea
        </Typography>
        <Divider style={{marginTop: '0.5em', marginBottom: '0.5em'}} />
        <Typography variant={'body1'}>
          <Typography component={'span'} variant={'h5'}>
            {data.user_info.name}
          </Typography>
          {' '}
          <Box component={'span'} fontWeight={'fontWeightLight'}>
            {data.user_info.code}
          </Box>
          {' '}| PTT {data.user_info.ptt / 100} | Join at{' '}
          {dayjs.utc(data.user_info.join_date).local().format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
        <ArcaeaSongStatusList songs={data.songs} />
      </CardContent>
    </Card>
  )
}
