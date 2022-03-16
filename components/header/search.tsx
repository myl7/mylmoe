// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react'
import { Grid, IconButton, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import site from '../../content/site'

const searchUrl = (q: string) => {
  const params = new URLSearchParams([
    ['q', q],
    ['as_sitesearch', site.url],
    ['ncr', '1'],
  ])
  return 'https://www.google.com/search?' + params.toString()
}

const Search = () => {
  const ref = useRef<HTMLInputElement>()

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key == 'Enter' && ref.current && ref.current.value) {
      window.open(searchUrl(ref.current.value), '_blank')
    }
  }

  const handleClick = () => {
    if (ref.current && ref.current.value) {
      window.open(searchUrl(ref.current.value), '_blank')
    }
  }

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <IconButton onClick={handleClick} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            type="search"
            label="Search..."
            variant="outlined"
            size="small"
            onKeyDown={handleEnter}
            inputRef={ref}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Search
