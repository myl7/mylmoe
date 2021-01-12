import React from 'react'
import {
  CardContent,
  Divider,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Card,
  makeStyles
} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'
import ExternalLink from '../components/ExternalLink'
import WideDivider from '../components/WideDivider'

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

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.main
  },
  table: {
    backgroundColor: theme.palette.secondary.main
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <div>
      <Helmet>
        <title>Friends | mylmoe</title>
        <meta name={'description'} content={'mylmoe friend page containing friend websites'} />
        <link rel="canonical" href="https://myl.moe/pages/friends" />
      </Helmet>
      <Header />
      <Divider />
      <ContentCard className={classes.content}>
        <CardContent>
          <Typography variant={'h4'} component={'h1'}>
            Friends
          </Typography>
          <WideDivider />
          <TableContainer className={classes.table} component={Card}>
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
                      <Typography variant={'subtitle1'} component={ExternalLink} href={url}>
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant={'subtitle1'} component={ExternalLink} href={url}>
                        {url}
                      </Typography>
                    </TableCell>
                    <TableCell component={'th'} scope={'row'}>
                      <Typography variant={'subtitle1'} component={ExternalLink} href={about}>
                        {author}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {
                        rss ? (
                          <Typography variant={'subtitle1'} component={ExternalLink} href={rss}>
                            {relativePath(url, rss)}
                          </Typography>
                        ) : ''
                      }
                    </TableCell>
                    <TableCell>
                      <Typography variant={'subtitle1'} component={ExternalLink} href={'https://github.com/' + github}>
                        {github}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </ContentCard>
      <Footer />
    </div>
  )
}
