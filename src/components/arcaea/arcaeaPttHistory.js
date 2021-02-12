import React, {useEffect, useRef} from 'react'
import {Card, CardContent, CardHeader, useTheme} from '@material-ui/core'
import {formatDate} from '../../utils/datetime'

const getHistory = records => {
  return records.map(record => {
    const date = formatDate(record[0], 'YYMMDD').substring(5)
    const ptt = parseInt(record[1]) / 100
    return {date, ptt}
  })
}

const getHistoryRange = history => {
  const reducePtt = (a, b, cmp) => cmp(a.ptt, b.ptt) > 0 ? a : b
  const minPtt = history.reduce((a, b) => reducePtt(a, b, (a, b) => a < b)).ptt
  const min = Math.floor(minPtt * 10) / 10
  const maxPtt = history.reduce((a, b) => reducePtt(a, b, (a, b) => a > b)).ptt
  const max = Math.ceil(maxPtt * 10) / 10
  return [min, max]
}

const ArcaeaPttHistory = props => {
  const {rating_records, start = true, currentPtt, ...others} = props

  const ref = useRef()

  const history = getHistory(rating_records)
  const [min, max] = getHistoryRange(history)

  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const backgroundColor = theme.palette.background.paper

  useEffect(() => {
    if (start) {
      import('../../utils/echarts').then(m => {
        const echarts = m.default
        const chart = echarts.init(ref.current)
        chart.setOption({
          xAxis: {
            type: 'category',
            data: history.map(({date}) => date)
          },
          yAxis: {
            type: 'value',
            min,
            max
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor,
            textStyle: {
              color: textColor
            }
          },
          series: [{
            type: 'line',
            data: history.map(({ptt}) => ptt),
            smooth: true
          }]
        })
      })
    }
  }, [start, ref, history, min, max, backgroundColor, textColor])

  return (
    <Card variant="outlined" component="article" {...others}>
      <CardHeader title={`PTT History`} titleTypographyProps={{component: 'h2'}}
                  subheader={'Current: ' + (currentPtt).toFixed(2)} />
      <CardContent>
        <div ref={ref} style={{width: 400, height: 284}}>
          {history.slice(0, 10).map(({date, ptt}) => (
            <div key={date}>
              {date}: {ptt.toFixed(2)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ArcaeaPttHistory
