import React from 'react'
import {Switch} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'

export default props => {
  const dispatch = useDispatch()

  const dark = useSelector(s => s.theme.dark)

  const handleSwitch = () => {
    localStorage.setItem('mylmoe.theme.dark', (!dark).toString())
    document.getElementsByTagName('body')[0].style.setProperty(
      'background-color', !dark ? '#303030' : '#fafafa'
    )
    dispatch({
      type: 'theme.dark',
      payload: !dark
    })
  }

  return (
    <Switch checked={Boolean(dark)} onChange={handleSwitch} color={'primary'} {...props} />
  )
}
