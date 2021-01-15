import React from 'react'
import {Switch} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'

export default props => {
  const dispatch = useDispatch()

  const dark = useSelector(s => s.theme.dark)

  const handleSwitch = () => {
    localStorage.setItem('mylmoe.theme.dark', (!dark).toString())
    dispatch({
      type: 'theme.dark',
      payload: !dark
    })
  }

  return (
    <Switch checked={Boolean(dark)} onChange={handleSwitch} color={'primary'} {...props} />
  )
}
