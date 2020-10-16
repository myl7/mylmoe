import {Box, Card, CardContent, Grid, Typography} from '@material-ui/core'
import React from 'react'
import dayjs from 'dayjs'
import echarts from 'echarts'

const dayToStr = d => dayjs.utc(d).local().format('YYYY-MM-DD HH:mm:ss')

export default (props) => {
  let {songs} = props

  return (
    <Grid container spacing={2}>
      {songs.map(song => (
        <Grid item key={song.id} xs={4}>
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
                      <div className={'echart-bar'} style={{width: 50, height: 160}}>
                        Memory {song.health}%
                      </div>
                    </Grid>
                    <Grid item>
                      <div className={'echart-pie'} style={{width: 350, height: 160}}>
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
      ))}
    </Grid>
  )
}

export const drawHealthCharts = (elems, songs) => {
  elems.forEach((elem, i) => {
    const healthChart = echarts.init(elem)
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
        data: [songs[i].health],
        showBackground: true,
        barWidth: '25%',
      }],
      grid: {
        top: '20%',
        bottom: '20%'
      }
    })
  })
}

export const drawCountCharts = (elems, songs) => {
  elems.forEach((elem, i) => {
    const countChart = echarts.init(elem)
    const count = songs[i].count
    countChart.setOption({
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          {name: 'pure*', value: count.strict_pure},
          {name: 'pure', value: count.pure},
          {name: 'far', value: count.far},
          {name: 'lost', value: count.lost}
        ],
        label: {formatter: '{b} {c} {d}%'}
      }]
    })
  })
}
