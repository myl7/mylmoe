import {Card, CardContent, Link, Box, makeStyles} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  ccIcon: {
    height: '22px !important',
    marginLeft: '3px',
    verticalAlign: 'text-bottom'
  }
})

export default () => {
  const styles = useStyles()

  return (
    <Card style={{marginTop: '1em'}} variant={'outlined'}>
      <CardContent>
        <p style={{marginTop: 0, marginBottom: 0}} xmlnsDct="http://purl.org/dc/terms/" xmlnsCc="http://creativecommons.org/ns#">
          All displayed content on{' '}
          <Link rel="cc:attributionURL" property="dct:title" href="https://myl.moe">mlblog</Link>
          {' '}by{' '}
          <span property="cc:attributionName">myl7</span>
          {' '}is licensed under{' '}
          <Link rel="license" href="https://creativecommons.org/licenses/by-nc/4.0">
            CC BY-NC 4.0
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
            <Box component={'img'} className={styles.ccIcon}
                 src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC" />
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
