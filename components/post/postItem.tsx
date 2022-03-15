import React, { FC } from 'react'
import { Card, CardActionArea, CardContent, CardHeader, CardProps, Chip, Divider } from '@material-ui/core'
import PostDate from './postDate'
import { useRouter } from 'next/router'

export interface PostItemProps extends CardProps {
  title: string
  updDate: string
  pubDate: string
  tags: string
  excerpt: string
  path: string
}

const PostItem: FC<PostItemProps> = props => {
  const { title, updDate, pubDate, tags, excerpt, path, ...others } = props

  const router = useRouter()

  const handleCardClick = () => router.push(path)
  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/tags/${tag}/`)
  }

  return (
    <Card variant="outlined" component="article" {...others}>
      <CardActionArea onClick={handleCardClick}>
        <CardHeader
          title={title}
          titleTypographyProps={{ component: 'h2' }}
          subheader={
            <div>
              <PostDate updDate={updDate} pubDate={pubDate} />
              <div>
                {tags.split(' ').map(tag => (
                  <Chip
                    label={tag}
                    key={tag}
                    clickable
                    onClick={handleTagClick(tag)}
                    style={{ marginRight: '0.5em' }}
                  />
                ))}
              </div>
            </div>
          }
        />
        <Divider />
        <CardContent>{excerpt}</CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PostItem
