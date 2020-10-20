import React, {useEffect, useRef} from 'react'
import {Box, Card, CardContent, Grid, Typography} from '@material-ui/core'
import dayjs from 'dayjs'

const dayToStr = d => dayjs.utc(d).local().format('YYYY-MM-DD HH:mm:ss')

export default (props) => {
  const {song} = props

  const healthChartRef = useRef(null)
  const countChartRef = useRef(null)

  useEffect(() => {
    import(/* webpackChunkName: "echarts" */ 'echarts/lib/echarts').then(echarts => {
      import(/* webpackChunkName: "echarts" */ 'echarts/lib/chart/bar').then(() => {
        const healthChart = echarts.init(healthChartRef.current)
        healthChart.setOption({
          xAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: ['Memory']
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
    })
  }, [healthChartRef, song])

  useEffect(() => {
    import(/* webpackChunkName: "echarts" */ 'echarts').then(echarts => {
      import(/* webpackChunkName: "echarts" */ 'echarts/lib/chart/pie').then(() => {
        const countChart = echarts.init(countChartRef.current)
        countChart.setOption({
          series: [{
            type: 'pie',
            radius: '50%',
            data: [
              {name: 'pure*', value: song.count.strict_pure},
              {name: 'pure', value: song.count.pure},
              {name: 'far', value: song.count.far},
              {name: 'lost', value: song.count.lost}
            ],
            label: {formatter: '{b} {c} {d}%'}
          }]
        })
      })
    })
  }, [countChartRef, song])

  return (
    <Grid item xs={4}>
      <Card variant={'outlined'}>
        <CardContent>
          <Typography variant={'subtitle1'}>
            {song.title}{' '}
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
                {song.clear_type}
                {' | '}Rating: {song.rating.toFixed(5)}
              </div>
              <div>Latest Play at {dayToStr(song.play_date)}</div>
              <div>Get the song at {dayToStr(song.get_date)}</div>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <div ref={healthChartRef} style={{width: 50, height: 160}}>
                    Memory {song.health}%
                  </div>
                </Grid>
                <Grid item>
                  <div ref={countChartRef} style={{width: 350, height: 160}}>
                    Pure {song.count.pure}({song.count.strict_pure}){' '}
                    Far {song.count.far} Miss {song.count.lost}
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
