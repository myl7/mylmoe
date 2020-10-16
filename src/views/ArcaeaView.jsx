import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, AppBar, Tab, Typography, Box} from '@material-ui/core'
import {TabList, TabPanel, TabContext} from '@material-ui/lab'
import dayjs from 'dayjs'
import arcaeaProberApi from '../apis/arcaeaProberApi'
import ArcaeaSongStatusList, {drawCountCharts, drawHealthCharts} from '../components/ArcaeaSongStatusList'
import {initArcaeaUserInfo} from '../redux/initState'

export default () => {
  const [arcaeaProberData, setArcaeaProberData] = useState({
    songs: [], user_info: initArcaeaUserInfo
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

  const [tabNum, setTabNum] = useState('10')
  const handleTabSwitch = (_e, newTabNum) => {
    setTabNum(newTabNum)
  }

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

        <TabContext value={tabNum} style={{marginTop: '0.5em'}}>
          <AppBar>
            <TabList onChange={handleTabSwitch} aria-label={'select Arcaea song levels'}>
              <Tab label="11" value="11" />
              <Tab label="10+" value="10+" />
              <Tab label="10" value="10" />
              <Tab label="9+" value="9+" />
              <Tab label="9" value="9" />
              <Tab label="8" value="8" />
              <Tab label="7" value="7" />
            </TabList>
          </AppBar>
          <TabPanel value="11">
            <ArcaeaSongStatusList songs={data.songs} />
          </TabPanel>
          <TabPanel value="10+" />
          <TabPanel value="10" />
          <TabPanel value="9+" />
          <TabPanel value="9" />
          <TabPanel value="8" />
          <TabPanel value="7" />
        </TabContext>
      </CardContent>
    </Card>
  )
}
