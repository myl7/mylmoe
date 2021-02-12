import React, {useEffect} from 'react'
import {Switch} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {themeInitAction, themeSwitchAction} from '../../redux/themeRedux'
import {themeEffect} from '../../utils/theme'

const key = 'mylmoe.dark'

const ThemeSwitch = props => {
  const dark = useSelector(state => state.theme.dark)

  const dispatch = useDispatch()

  useEffect(() => {
    let dark = localStorage.getItem(key)
    dark = (dark === null ? false : Boolean(dark))
    themeEffect(dark)
    dispatch(themeInitAction(dark))
  })

  const handleChange = () => {
    localStorage.setItem(key, !dark ? '1' : '')
    themeEffect(!dark)
    dispatch(themeSwitchAction())
  }

  return (
    <Switch checked={dark} onChange={handleChange} {...props} />
  )
}

export default ThemeSwitch
