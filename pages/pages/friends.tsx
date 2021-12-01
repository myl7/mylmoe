import {
  CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@material-ui/core'
import ExtLink from '../../components/links/extLink'
import friends from '../../content/friends'
import Head from '../../components/head'
import head from '../../content/head'
import PostDate from '../../components/post/postDate'

const Friend = () => {
  const relPath = (root: string, url: string) => {
    if (url.substring(0, root.length) == root) {
      return url.substring(root.length)
    } else {
      return url.substring(url.indexOf('://') + 3)
    }
  }

  const {list, updDate} = friends

  return (
    <>
      <Head {...head['/pages/friends']} path="/pages/friends" />
      <CardHeader title={head['/pages/friends'].title} titleTypographyProps={{component: 'h1'}} subheader={
        <PostDate updDate={updDate} />
      } />
      <Divider />
      <CardContent>
        <TableContainer>
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
              {list.map(({title, url, author, about, rss, github}) => (
                <TableRow key={url}>
                  <TableCell component={'th'} scope={'row'}>
                    <Typography variant={'subtitle1'} color={'textPrimary'} component={ExtLink} href={url}>
                      {title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={'subtitle1'} color={'textPrimary'} component={ExtLink} href={url}>
                      {url}
                    </Typography>
                  </TableCell>
                  <TableCell component={'th'} scope={'row'}>
                    <Typography variant={'subtitle1'} color={'textPrimary'} component={ExtLink} href={about}>
                      {author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {
                      rss ? (
                        <Typography variant={'subtitle1'} color={'textPrimary'} component={ExtLink} href={rss}>
                          {relPath(url, rss)}
                        </Typography>
                      ) : ''
                    }
                  </TableCell>
                  <TableCell>
                    <Typography variant={'subtitle1'} color={'textPrimary'} component={ExtLink}
                                href={`https://github.com/${github}`}>
                      {github}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </>
  )
}

export default Friend
