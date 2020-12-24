import React from 'react'
import {Card, CardContent, Box, makeStyles} from '@material-ui/core'
import ExternalLink from './ExternalLink'

const useStyles = makeStyles({
  ccIcon: {
    height: '22px !important',
    marginLeft: '3px',
    verticalAlign: 'text-bottom'
  },
  footerText: {
    marginTop: 0,
    marginBottom: 0,
    color: '#eeeeee'
  }
})

export default () => {
  const styles = useStyles()

  return (
    <Card component={'footer'} style={{marginTop: '1em', backgroundColor: '#202020', borderRadius: 0}}>
      <CardContent>
        <Box component={'p'} className={styles.footerText}>
          <ExternalLink href={'https://github.com/myl7/mylmoe/tree/goshujin-sama/posts'}>Posts</ExternalLink>
          {' '}are licensed under{' '}
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
          Website source{' '}
          <ExternalLink href={'https://github.com/myl7/mylmoe'}>myl7/mylmoe</ExternalLink>
          {' '}is licensed under MIT.
        </Box>
      </CardContent>
    </Card>
  )
}
