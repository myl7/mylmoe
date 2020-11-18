import React from 'react'
import ReactDOM from 'react-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import App from './App'

dayjs.extend(utc)

ReactDOM.render(<App />, document.getElementById('root'))
