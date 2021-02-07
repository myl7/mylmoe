import React, {useEffect} from 'react'
import {Switch} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {themeInitAction, themeSwitchAction} from '../../redux/themeRedux'

const key = 'mylmoe.dark'

const ThemeSwitch = props => {
  const dark = useSelector(state => state.theme.dark)

  const dispatch = useDispatch()

  useEffect(() => {
    let dark = localStorage.getItem(key)
    dark = (dark === null ? false : Boolean(dark))
    dispatch(themeInitAction(dark))
  })

  const handleChange = () => {
    localStorage.setItem(key, !dark ? '1' : '')
    document.getElementsByTagName('body')[0].style.setProperty(
      'background-color', !dark ? '#303030' : '#fafafa'
    )
    dispatch(themeSwitchAction())
  }

  return (
    <Switch checked={dark} onChange={handleChange} {...props} />
  )
}

export default ThemeSwitch
