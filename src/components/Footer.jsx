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
                 src="https://cdn.jsdelivr.net/gh/myl7/mylmoe-images@goshujin-sama/cc/cc.svg" alt="CC" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://cdn.jsdelivr.net/gh/myl7/mylmoe-images@goshujin-sama/cc/by.svg" alt="BY" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://cdn.jsdelivr.net/gh/myl7/mylmoe-images@goshujin-sama/cc/nc.svg" alt="NC" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://cdn.jsdelivr.net/gh/myl7/mylmoe-images@goshujin-sama/cc/sa.svg" alt="SA" />
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
