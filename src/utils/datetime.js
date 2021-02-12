import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

const format = (d, fs, parseFs) => dayjs.utc(d, parseFs).local().format(fs)

export const formatDate = (d, parseFs) => format(d, 'YYYY-MM-DD', parseFs)
export const formatTime = (d, parseFs) => format(d, 'YYYY-MM-DD HH:mm:ss', parseFs)
