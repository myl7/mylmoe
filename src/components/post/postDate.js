import React from 'react'
import {Box} from '@material-ui/core'

const PostDate = props => {
  const {updDate, pubDate, children} = props

  return (
    <div>
      {children}
      {children ? ' | ' : ''}
      Updated on {''}
      <Box component={'span'} fontWeight={'fontWeightBold'}>
        {updDate}
      </Box>
      {''} | Published on {''}
      <Box component={'span'} fontWeight={'fontWeightBold'}>
        {pubDate}
      </Box>
    </div>
  )
}

export default PostDate
