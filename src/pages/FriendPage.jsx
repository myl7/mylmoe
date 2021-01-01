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
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'
import ExternalLink from '../components/ExternalLink'
import WideDivider from '../components/WideDivider'

const friends = [
  {
    title: 'Totoro’s Blog',
    url: 'https://yyw.moe',
    rssUrl: 'https://yyw.moe/atom.xml'
  }
]

const relativePath = (root, url) => {
  if (url.substring(0, root.length) === root) {
    return url.substring(root.length)
  } else {
    return url
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
      <Header />
      <Divider />
      <ContentCard className={classes.content}>
        <CardContent>
          <Typography variant={'h4'}>
            Friends
          </Typography>
          <WideDivider />
          <TableContainer className={classes.table} component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>RSS URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {friends.map(({title, url, rssUrl}) => (
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
                    <TableCell>
                      <Typography variant={'subtitle1'} component={ExternalLink} href={rssUrl}>
                        {relativePath(url, rssUrl)}
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
