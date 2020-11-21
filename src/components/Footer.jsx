import React from 'react'
import {Card, CardContent, Box, makeStyles} from '@material-ui/core'
import ExternalLink from './link/ExternalLink'

const useStyles = makeStyles({
  ccIcon: {
    height: '22px !important',
    marginLeft: '3px',
    verticalAlign: 'text-bottom'
  },
  footerText: {
    marginTop: 0,
    marginBottom: 0
  }
})

export default () => {
  const styles = useStyles()

  return (
    <Card style={{marginTop: '1em'}} variant={'outlined'}>
      <CardContent>
        <Box component={'p'} className={styles.footerText}>
          All{' '}
          <ExternalLink href={'https://github.com/myl7/mlpost'}>posts</ExternalLink>
          {' '}on the website by myl7 are licensed under{' '}
          <ExternalLink rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            CC BY-NC-SA 4.0
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt="SA" />
          </ExternalLink>
        </Box>
        <Box component={'p'} className={styles.footerText} style={{marginTop: '0.5em'}}>
          Source code of{' '}
          <ExternalLink href={'https://github.com/myl7/mlfend'}>frontend</ExternalLink>
          {' '}and{' '}
          <ExternalLink href={'https://github.com/myl7/mlbend'}>backend</ExternalLink>
          {' '} of the website is licensed under MIT.
        </Box>
      </CardContent>
    </Card>
  )
}
