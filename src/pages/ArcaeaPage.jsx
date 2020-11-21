import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, AppBar, Tab, Typography, Box, Grid} from '@material-ui/core'
import {TabList, TabPanel, TabContext} from '@material-ui/lab'
import ArcaeaApi from '../apis/ArcaeaApi'
import {formatDatetime} from '../utils/dayjs'
import ArcaeaSong from '../components/ArcaeaSong'

const levels = ['lv11', 'lv10p', 'lv10', 'lv9p', 'lv9', 'lv8', 'lv7']

export default () => {
  const [data, setData] = useState({
    songs: Object.fromEntries(levels.map(l => [l, []])),
    userInfo: {name: null, code: null, ptt: null, join_date: null}
  })

  const [tabNum, setTabNum] = useState('lv10')
  const handleTabSwitch = (_, newTabNum) => {
    setTabNum(newTabNum)
  }

  useEffect(() => {
    new ArcaeaApi().data().then(data => {
      if (data !== undefined) {
        setData(data)
      }
    })
  }, [setData])

  const {songs, userInfo} = data
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
          {formatDatetime(userInfo.join_date)}
        </Typography>

        <TabContext value={tabNum} style={{marginTop: '0.5em'}}>
          <AppBar position={'sticky'}>
            <TabList onChange={handleTabSwitch} centered>
              {levels.map(l => <Tab label={l} value={l} key={l} />)}
            </TabList>
          </AppBar>
          {levels.map(l => (
            <TabPanel value={l} key={l}>
              <Grid container spacing={2} justify={'center'}>
                {songs[l].map(song => <ArcaeaSong key={song.id} song={song} />)}
              </Grid>
            </TabPanel>
          ))}
        </TabContext>
      </CardContent>
    </Card>
  )
}
