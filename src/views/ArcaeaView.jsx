import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, AppBar, Tab, Typography, Box} from '@material-ui/core'
import {TabList, TabPanel, TabContext} from '@material-ui/lab'
import dayjs from 'dayjs'
import arcaeaProberApi from '../apis/arcaeaProberApi'
import ArcaeaSongs, {drawCountCharts, drawHealthCharts} from '../components/ArcaeaSongs'

const initArcaeaSongs = {c11: [], c10p: [], c10: [], c9p: [], c9: [], c8: [], c7: []}
const initArcaeaUserInfo = {name: null, code: null, ptt: null, join_date: null}

export default () => {
  const [arcaeaProberData, setArcaeaProberData] = useState({
    songs: initArcaeaSongs, user_info: initArcaeaUserInfo
  })

  const handleCharts = (tabNum) => {
    const {songs} = arcaeaProberData

    const countChartElems = document.querySelectorAll('div.echart-pie')
    drawCountCharts(countChartElems, songs['c' + tabNum])

    const healthChartElems = document.querySelectorAll('div.echart-bar')
    drawHealthCharts(healthChartElems, songs['c' + tabNum])
  }

  useEffect(() => {
    arcaeaProberApi().then(data => {
      setArcaeaProberData(data)
      handleCharts('10')
    })
  }, [])

  const [tabNum, setTabNum] = useState('10')
  const handleTabSwitch = (_e, newTabNum) => {
    setTabNum(newTabNum)
  }

  useEffect(() => {
    handleCharts(tabNum)
  }, [tabNum])

  useEffect(() => {
    const {songs} = arcaeaProberData

    const countChartElems = document.querySelectorAll('div.echart-pie')
    drawCountCharts(countChartElems, songs['c' + tabNum])

    const healthChartElems = document.querySelectorAll('div.echart-bar')
    drawHealthCharts(healthChartElems, songs['c' + tabNum])
  }, [tabNum])

  const {songs, user_info: userInfo} = arcaeaProberData
  const {c11, c10p, c10, c9p, c9, c8, c7} = songs
  return (
    <Card>
      <CardContent>
        <Typography variant={'h4'}>
          Arcaea
        </Typography>
        <Divider style={{marginTop: '0.5em', marginBottom: '0.5em'}} />
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

        <TabContext value={tabNum} style={{marginTop: '0.5em'}}>
          <AppBar>
            <TabList onChange={handleTabSwitch} aria-label={'select Arcaea song levels'}>
              <Tab label="11" value="11" />
              <Tab label="10+" value="10p" />
              <Tab label="10" value="10" />
              <Tab label="9+" value="9p" />
              <Tab label="9" value="9" />
              <Tab label="8" value="8" />
              <Tab label="7" value="7" />
            </TabList>
          </AppBar>
          <TabPanel value="11"><ArcaeaSongs songs={c11} /></TabPanel>
          <TabPanel value="10p"><ArcaeaSongs songs={c10p} /></TabPanel>
          <TabPanel value="10"><ArcaeaSongs songs={c10} /></TabPanel>
          <TabPanel value="9p"><ArcaeaSongs songs={c9p} /></TabPanel>
          <TabPanel value="9"><ArcaeaSongs songs={c9} /></TabPanel>
          <TabPanel value="8"><ArcaeaSongs songs={c8} /></TabPanel>
          <TabPanel value="7"><ArcaeaSongs songs={c7} /></TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}
