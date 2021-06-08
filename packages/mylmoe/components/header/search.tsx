import React, {FC, useRef} from 'react'
import {Grid, GridProps, IconButton, TextField, TextFieldProps} from '@material-ui/core'
import {Search as SearchIcon} from '@material-ui/icons'
import site from '../../config/site'

export interface SearchProps extends GridProps {
  textFieldProps?: TextFieldProps
}

const searchUrl = (q: string) => {
  const params = new URLSearchParams([['q', q], ['as_sitesearch', site.url], ['ncr', '1']])
  return 'https://www.google.com/search?' + params.toString()
}

const Search: FC<SearchProps> = props => {
  const {textFieldProps, ...others} = props

  const ref = useRef<HTMLInputElement>()

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      window.open(searchUrl((e.target as HTMLInputElement).value), '_blank')
    }
  }

  const handleClick = () => {
    if (ref.current && ref.current.value) {
      window.open(searchUrl(ref.current.value), '_blank')
    }
  }

  return (
    <Grid container spacing={1} {...others} alignItems="center">
      <Grid item>
        <IconButton onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <TextField type="search" label="Search..." variant="outlined" size="small"
                   onKeyDown={handleEnter} inputRef={ref} {...textFieldProps} />
      </Grid>
    </Grid>
  )
}

export default Search
