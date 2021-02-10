import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const format = (d, fs) => dayjs.utc(d).local().format(fs)
export const formatDate = d => format(d, 'YYYY-MM-DD')
