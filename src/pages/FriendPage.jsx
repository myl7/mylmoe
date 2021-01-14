import React from 'react'
import {
  Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Card
} from '@material-ui/core'
import ExternalLink from '../components/ExternalLink'
import BodyPage from './BodyPage'

const friends = [
  {
    title: 'Totoro’s Blog',
    url: 'https://yyw.moe',
    author: 'Totoroyyw',
    about: 'https://yyw.moe/about',
    rss: 'https://yyw.moe/atom.xml',
    github: 'yuanyiwei'
  },
  {
    title: 'RubyOcelot’s Homepage',
    url: 'https://loliw.moe',
    author: 'RubyOcelot',
    about: 'https://loliw.moe/about',
    rss: 'https://loliw.moe/feed.xml',
    github: 'RubyOcelot'
  },
  {
    title: 'Elsa Granger',
    url: 'https://blog.elsagranger.com',
    author: 'Elsa Granger',
    about: 'https://elsagranger.com',
    rss: 'https://blog.elsagranger.com/rss.xml',
    github: 'zeyugao'
  },
  {
    title: 'taoky\'s blog',
    url: 'https://blog.taoky.moe',
    author: 'taoky',
    about: 'https://blog.taoky.moe/about',
    rss: 'https://blog.taoky.moe/feed.xml',
    github: 'taoky'
  },
  {
    title: 'Sirius’ blog',
    url: 'https://sirius1242.github.io',
    author: 'Sirius',
    about: 'https://sirius1242.github.io',
    rss: 'https://sirius1242.github.io/feed.xml',
    github: 'sirius1242'
  },
  {
    title: 'iBug',
    url: 'https://ibug.io',
    author: 'iBug',
    about: 'https://ibug.io/about',
    rss: 'https://ibug.io/feed.xml',
    github: 'iBug'
  }
]

const relativePath = (root, url) => {
  if (url.substring(0, root.length) === root) {
    return url.substring(root.length)
  } else {
    return url.substring(url.indexOf('://') + 3)
  }
}

export default () => {
  return (
    <BodyPage title={'Friends'} description={'myl7\'s friends who have a blog'} path={'/pages/friends'}>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>RSS</TableCell>
              <TableCell>GitHub</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friends.map(({title, url, author, about, rss, github}) => (
              <TableRow key={url}>
                <TableCell component={'th'} scope={'row'}>
                  <Typography variant={'subtitle1'} color={'textPrimary'} component={ExternalLink} href={url}>
                    {title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant={'subtitle1'} color={'textPrimary'} component={ExternalLink} href={url}>
                    {url}
                  </Typography>
                </TableCell>
                <TableCell component={'th'} scope={'row'}>
                  <Typography variant={'subtitle1'} color={'textPrimary'} component={ExternalLink} href={about}>
                    {author}
                  </Typography>
                </TableCell>
                <TableCell>
                  {
                    rss ? (
                      <Typography variant={'subtitle1'} color={'textPrimary'} component={ExternalLink} href={rss}>
                        {relativePath(url, rss)}
                      </Typography>
                    ) : ''
                  }
                </TableCell>
                <TableCell>
                  <Typography variant={'subtitle1'} color={'textPrimary'} component={ExternalLink}
                              href={'https://github.com/' + github}>
                    {github}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BodyPage>
  )
}
