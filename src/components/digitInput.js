import React from 'react'
import {TextField} from '@material-ui/core'

const DigitInput = props => {
  const {inputRef, label, error, setError, defaultValue, ...others} = props

  const handleChange = e => {
    if (e.target.value.match(/^[0-9]*$/)) {
      setError('')
    } else {
      setError('Only allow digits')
    }
  }

  return (
    <TextField error={Boolean(error)} label={label} variant={'outlined'} inputRef={inputRef} helperText={error}
               onChange={handleChange} defaultValue={defaultValue} {...others} />
  )
}

export default DigitInput
