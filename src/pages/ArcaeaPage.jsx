import React, {useEffect, useState} from 'react'
import {AppBar, Tab, Typography, Box, Grid} from '@material-ui/core'
import {TabList, TabPanel, TabContext} from '@material-ui/lab'
import ArcaeaApi, {levels} from '../apis/ArcaeaApi'
import {formatDatetime} from '../utils/dayjs'
import ArcaeaSong from '../components/ArcaeaSong'
import BodyPage from './BodyPage'
import {useLg} from '../components/screenSizeHooks'

export default () => {
  const [data, setData] = useState({
    songs: Object.fromEntries(levels.map(l => [l, []])),
    userInfo: {name: null, user_code: null, rating: null, join_date: null}
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

  const isLg = useLg()

  const {songs, userInfo} = data
  return (
    <BodyPage title={'Arcaea scores'}
              description={'myl7\'s Arcaea scores. Feel free to use the template to display your own Arcaea scores.'}
              path={'/pages/arcaea'}>
      <Typography variant={'body1'}>
        <Typography component={'span'} variant={'h5'}>
          {userInfo.name}
        </Typography>
        {' '}
        <Box component={'span'} fontWeight={'fontWeightLight'}>
          code: {userInfo.user_code}
        </Box>
        {' '}| PTT: {userInfo.rating} | joinTime: {formatDatetime(userInfo.join_date)} |
      </Typography>
      <TabContext value={tabNum} style={{marginTop: '0.5em'}}>
        <AppBar position={'sticky'}>
          <TabList onChange={handleTabSwitch} {...(
            isLg ? {variant: 'fullWidth', centered: true} : {variant: 'scrollable'}
          )} scrollButtons={'on'}>
            {levels.map(l => {
              const label = /\d+/.exec(l)[0] + (l[l.length - 1] === 'p' ? '+' : '')
              return <Tab label={label} value={l} key={l} />
            })}
          </TabList>
        </AppBar>
        {levels.map(l => (
          <TabPanel value={l} key={l}>
            <Grid container spacing={2} justify={'center'}>
              {songs[l].map(song => <ArcaeaSong key={song.song_id} song={song} />)}
            </Grid>
          </TabPanel>
        ))}
      </TabContext>
    </BodyPage>
  )
}
