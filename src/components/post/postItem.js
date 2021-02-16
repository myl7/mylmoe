import React from 'react'
import {Card, CardActionArea, CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import PostDate from './postDate'
import {navigate} from 'gatsby'
import IntLinkReset from '../links/intLinkReset'

const PostItem = props => {
  const {title, updDate, pubDate, tags, excerpt, path, ...others} = props

  const handleCardClick = () => navigate(path)
  const handleTagClick = e => e.stopPropagation()

  return (
    <Card variant="outlined" component="article" {...others}>
      <CardActionArea onClick={handleCardClick}>
        <CardHeader title={
          <IntLinkReset to={path}>
            {title}
          </IntLinkReset>
        } titleTypographyProps={{component: 'h2'}} subheader={
          <div>
            <PostDate updDate={updDate} pubDate={pubDate} />
            <div>
              {tags.split(' ').map(tag => (
                <Chip label={
                  <IntLinkReset to={`/tags/${tag}/`}>
                    {tag}
                  </IntLinkReset>
                } key={tag} clickable onClick={handleTagClick} style={{marginRight: '0.5em'}} />
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
