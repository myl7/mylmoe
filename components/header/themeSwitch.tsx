import { Switch, SwitchProps } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { themeToggleAction } from '../../redux/theme'
import { themeEffect } from '../theme'
import { State } from '../../redux/state'
import { FC } from 'react'

const ThemeSwitch: FC<SwitchProps> = props => {
  const dark = useSelector((state: State) => state.theme.dark)

  const dispatch = useDispatch()

  const handleChange = () => {
    localStorage.setItem('mylmoe.theme.dark', !dark ? '1' : '')
    themeEffect(!dark)
    dispatch(themeToggleAction())
  }

  return <Switch checked={dark} onChange={handleChange} {...props} />
}

export default ThemeSwitch
