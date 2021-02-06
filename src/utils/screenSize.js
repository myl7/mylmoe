import {useMediaQuery} from '@material-ui/core'

export const useXs = () => useMediaQuery(theme => theme.breakpoints.down('xs'))
export const useLg = () => useMediaQuery(theme => theme.breakpoints.up('lg'))
