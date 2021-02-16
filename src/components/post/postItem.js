import React from 'react'
import {Card, CardActionArea, CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import PostDate from './postDate'
import {navigate} from 'gatsby'

const PostItem = props => {
  const {title, updDate, pubDate, tags, excerpt, path, ...others} = props

  const handleCardClick = () => navigate(path)
  const handleTagClick = tag => e => {
    e.stopPropagation()
    navigate(`/tags/${tag}/`)
  }

  return (
    <Card variant="outlined" component="article" {...others}>
      <CardActionArea onClick={handleCardClick}>
        <CardHeader title={title} titleTypographyProps={{component: 'h2'}} subheader={
          <div>
            <PostDate updDate={updDate} pubDate={pubDate} />
            <div>
              {tags.split(' ').map(tag => (
                <Chip label={tag} key={tag} clickable onClick={handleTagClick(tag)}
                      style={{marginRight: '0.5em'}} />
              ))}
            </div>
          </div>
        } />
        <Divider />
        <CardContent>
          {excerpt}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PostItem
