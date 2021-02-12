import React, {useEffect, useRef} from 'react'
import {Card, CardContent, CardHeader, Typography, useTheme} from '@material-ui/core'
import {formatDate, formatTime} from '../../utils/datetime'

const getScoreRank = score => {
  if (score > 9900000) {
    return 'EX+'
  } else if (score > 9800000) {
    return 'EX'
  } else if (score > 9500000) {
    return 'AA'
  } else if (score > 9200000) {
    return 'A'
  } else if (score > 8900000) {
    return 'B'
  } else if (score > 8600000) {
    return 'C'
  } else {
    return 'D'
  }
}

const getTitle = (songId, songTitle) => {
  const song = songTitle[songId]
  if (song.ja) {
    return song.ja
  } else if (song.en) {
    return song.en
  } else {
    return 'Song which does not have a title'
  }
}

const ArcaeaScore = props => {
  const {score: songScore, start = true, songTitle, titlePrefix = '', ...others} = props
  const {
    song_id, difficulty, score, shiny_perfect_count, perfect_count, near_count, miss_count, health, time_played,
    // eslint-disable-next-line no-unused-vars
    best_clear_type, clear_type, constant, rating, song_date
  } = songScore

  const title = getTitle(song_id, songTitle)
  const difficultyLabel = ['PST', 'PRT', 'FTR', 'BYD'][difficulty]
  let scoreRank = getScoreRank(score)

  const ref = useRef()

  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const backgroundColor = theme.palette.background.paper

  useEffect(() => {
    if (start) {
      import('../../utils/echarts').then(m => {
        const echarts = m.default
        const chart = echarts.init(ref.current)
        chart.setOption({
          title: {
            text: 'Note accuracy',
            left: 'center',
            textStyle: {
              color: textColor
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: textColor
            }
          },
          tooltip: {
            trigger: 'item',
            backgroundColor,
            textStyle: {
              color: textColor
            }
          },
          color: ['#c23531', '#61a0a8', '#d48265', '#91c7ae'],
          series: [{
            type: 'pie',
            center: ['50%', '70%'],
            radius: '50%',
            data: [
              {name: 'pure*', value: shiny_perfect_count},
              {name: 'pure', value: perfect_count},
              {name: 'far', value: near_count},
              {name: 'lost', value: miss_count}
            ],
            label: {
              formatter: '{b} {c} {d}%',
              color: textColor
            },
            tooltip: {
              formatter: '{b} {c} {d}%'
            }
          }]
        })
      })
    }
  }, [start, shiny_perfect_count, perfect_count, near_count, miss_count, ref, textColor, backgroundColor])

  return (
    <Card variant="outlined" component="article" {...others}>
      <CardHeader title={`${titlePrefix}${title} ${difficultyLabel} ${constant.toFixed(1)}`}
                  titleTypographyProps={{component: 'h2'}}
                  subheader={`${scoreRank} ${score} at ${formatTime(time_played)}`} />
      <CardContent>
        <Typography variant="subtitle1">
          Rating: {rating.toFixed(5)}
        </Typography>
        <Typography variant="subtitle1">
          Left health after cleared: {health}%
        </Typography>
        <Typography variant="subtitle1">
          Song available on {formatDate(song_date * 1000)}
        </Typography>
        <div ref={ref} style={{width: 400, height: 200}}>
          pure {shiny_perfect_count + perfect_count}({perfect_count}) {''}
          far {near_count} {''}
          lost {miss_count}
        </div>
      </CardContent>
    </Card>
  )
}

export default ArcaeaScore
