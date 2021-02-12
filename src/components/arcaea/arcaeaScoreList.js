import React, {useState} from 'react'
import {AppBar, Grid, Tab} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'
import {useLg} from '../../utils/screenSize'
import ArcaeaScore from './arcaeaScore'

const getLevel = constant => {
  let level = `${constant | 0}`
  if (constant > 9 && (constant % 1 > 0.6)) {
    level += '+'
  }
  return level
}

const getLevelNum = level => {
  let plus = false
  if (level[level.length - 1] === '+') {
    level = level.substring(0, level.length - 1)
  }
  return parseInt(level) + (plus ? 0.5 : 0)
}

const ArcaeaScoreList = props => {
  const {scores, songTitle, ...others} = props

  const isLg = useLg()

  const [tab, setTab] = useState(null)

  const scoresByLevel = {}
  for (const score of scores) {
    const level = getLevel(score.constant)
    if (scoresByLevel[level] === undefined) {
      scoresByLevel[level] = [score]
    } else {
      scoresByLevel[level].push(score)
    }
  }

  const levels = Object.keys(scoresByLevel).sort((a, b) => getLevelNum(a) - getLevelNum(b)).reverse()
  const defaultLevel = levels[levels.length / 2 | 0]

  const handleChange = (_, level) => setTab(level)

  return (
    <TabContext value={tab === null ? defaultLevel : tab} {...others}>
      <AppBar position={'sticky'} style={{marginTop: '1em'}}>
        <TabList onChange={handleChange} {...(
          isLg ? {variant: 'fullWidth', centered: true} : {variant: 'scrollable'}
        )} scrollButtons={'on'}>
          {levels.map(level => (
            <Tab label={level} value={level} key={level} />
          ))}
        </TabList>
      </AppBar>
      {levels.map(level => (
        <TabPanel value={level} key={level}>
          <Grid container spacing={2} justify={'center'}>
            {scoresByLevel[level].map(score => (
              <Grid item key={score.song_id}>
                <ArcaeaScore score={score} songTitle={songTitle} start={true} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </TabContext>
  )
}

export default ArcaeaScoreList
