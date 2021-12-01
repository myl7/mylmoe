import {Box} from '@material-ui/core'
import {FC} from 'react'

export interface PostDateProps {
  updDate?: string,
  pubDate: string
}

const PostDate: FC<PostDateProps> = props => {
  const {updDate: updD, pubDate, children} = props
  const updDate = updD ?? pubDate

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
