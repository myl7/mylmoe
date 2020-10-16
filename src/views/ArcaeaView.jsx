import React, {useEffect, useState} from 'react'
import {Card, CardContent, Divider, Typography, Box, Grid} from '@material-ui/core'
import arcaeaProberApi from '../apis/arcaeaProberApi'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import echarts from 'echarts'

export default () => {
  const [arcaeaProberData, setArcaeaProberData] = useState({
    songs: [], user_info: {name: null, code: null, ptt: null, join_date: null}
  })

  useEffect(() => {
    arcaeaProberApi().then(data => {
      setArcaeaProberData(data)

      document.querySelectorAll('div.echart-pie').forEach((elem, i) => {
        const countChart = echarts.init(elem)
        const count = data.songs[i].count
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

      document.querySelectorAll('div.echart-bar').forEach((elem, i) => {
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
            data: [data.songs[i].health],
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
  }, [])

  dayjs.extend(utc)
  const dayToStr = d => dayjs.utc(d).local().format('YYYY-MM-DD HH:mm:ss')

  const data = arcaeaProberData
  // noinspection JSUnresolvedVariable
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
          {' '}| PTT {data.user_info.ptt / 100} | Join at {dayToStr(data.user_info.join_date)}
        </Typography>
        <Grid container spacing={4} style={{marginTop: '0.5em'}} wrap={'wrap'}>
          {data.songs.map(song => (
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
      </CardContent>
    </Card>
  )
}
