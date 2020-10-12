import {Card, CardContent, Box, makeStyles} from '@material-ui/core'
import React from 'react'
import ExternalLink from './ExternalLink'

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
        <Box component={'p'} className={styles.footerText} xmlns:dct="http://purl.org/dc/terms/"
             xmlns:cc="http://creativecommons.org/ns#">
          All displayed content on{' '}
          <ExternalLink rel="cc:attributionURL" property="dct:title" href="https://myl.moe">mlblog</ExternalLink>
          {' '}by{' '}
          <span property="cc:attributionName">myl7</span>
          {' '}is licensed under{' '}
          <ExternalLink rel="license" href="https://creativecommons.org/licenses/by-nc/4.0">
            CC BY-NC 4.0
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC" />
          </ExternalLink>
        </Box>
        <Box component={'p'} className={styles.footerText} xmlns:dct="http://purl.org/dc/terms/"
             style={{marginTop: '0.5em'}}>
          Source code of{' '}
          <ExternalLink property="dct:title" href="https://myl.moe">mlblog</ExternalLink>
          {' '}is located at{' '}
          <ExternalLink href={'https://github.com/myl7/mlblog'}>myl7/mlblog</ExternalLink>
          , which is licensed under{' '}
          <ExternalLink rel="license" href={'https://github.com/myl7/mlblog/blob/master/LICENSE'}>MIT</ExternalLink>
          .
        </Box>
      </CardContent>
    </Card>
  )
}
