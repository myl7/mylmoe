import React, {useRef} from 'react'
import {Grid, IconButton, TextField} from '@material-ui/core'
import {Search as SearchIcon} from '@material-ui/icons'
import {graphql, useStaticQuery} from 'gatsby'
import {searchUrl} from '../../utils/google'

const Search = props => {
  const {textFieldProps, ...others} = props

  const data = useStaticQuery(graphql`
    query SearchQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)
  const {siteUrl} = data.site.siteMetadata

  const ref = useRef()

  const handleEnter = e => {
    if (e.keyCode === 13) {
      window.open(searchUrl(e.target.value, siteUrl), '_blank')
    }
  }

  const handleClick = () => {
    console.log(ref.current)
    if (ref.current.value) {
      window.open(searchUrl(ref.current.value, siteUrl), '_blank')
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
