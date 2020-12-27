import React, {useEffect, useRef} from 'react'
import {Box, Card, CardContent, Grid, Typography} from '@material-ui/core'
import {formatDate, formatDatetime} from '../utils/dayjs'

export default (props) => {
  const {song} = props

  const healthChartRef = useRef(null)
  const countChartRef = useRef(null)

  useEffect(() => {
    import('../echarts').then(m => {
      const echarts = m.default
      const healthChart = echarts.init(healthChartRef.current)
      healthChart.setOption({
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: [{
            value: 'recall',
            textStyle: {
              color: '#eeeeee'
            }
          }]
        },
        yAxis: {
          show: false,
          min: 0,
          max: 100,
        },
        series: [{
          type: 'bar',
          data: [song.health],
          showBackground: true,
          barWidth: '25%',
        }],
        grid: {
          top: '20%',
          bottom: '20%'
        }
      })
    })
  }, [healthChartRef, song])

  useEffect(() => {
    import('../echarts').then(m => {
      const echarts = m.default
      const countChart = echarts.init(countChartRef.current)
      countChart.setOption({
        color: ['#c23531', '#61a0a8', '#d48265', '#91c7ae'],
        series: [{
          type: 'pie',
          radius: '50%',
          data: [
            {name: 'pure*', value: song.shiny_perfect_count},
            {name: 'pure', value: song.perfect_count},
            {name: 'far', value: song.near_count},
            {name: 'lost', value: song.miss_count}
          ],
          label: {formatter: '{b} {c} {d}%'}
        }]
      })
    })
  }, [countChartRef, song])

  return (
    <Grid item>
      <Card variant={'outlined'}>
        <CardContent>
          <Typography variant={'subtitle1'}>
            {song.title} {song.difficulty}{' '}
            <Box component={'span'} fontWeight={'fontWeightLight'}>
              {song.constant.toFixed(1)}
            </Box>
          </Typography>
          <Grid container direction={'column'}>
            <Grid item>
              <div>
                <Box component={'span'} fontWeight={'fontWeightBold'} fontSize={'h6.fontSize'}>
                  {song.score}{' '}
                </Box>
                {song.score_rank}
                {' | '}rating: {song.rating.toFixed(5)}
              </div>
              <div>playTime: {formatDatetime(song.time_played)}</div>
              <div>pubDate: {formatDate(song.song_date)}</div>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <div ref={healthChartRef} style={{width: 50, height: 160}}>
                    recall {song.health}%
                  </div>
                </Grid>
                <Grid item>
                  <div ref={countChartRef} style={{width: 350, height: 160}}>
                    pure {song.strict_perfect_count}({song.perfect_count}) far {song.near_count} lost {song.miss_count}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
