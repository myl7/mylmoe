import React, {useEffect, Fragment, useState} from 'react'
import {CardContent, Typography, Grid, makeStyles, Divider} from '@material-ui/core'
import {formatDatetime} from '../utils/dayjs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 'calc(100vh - 106px)'
  },
  ideaItemDivider: {
    backgroundColor: theme.palette.primary.main
  }
}))

export default () => {
  const classes = useStyles()

  const [ideas, setIdeas] = useState([
    {
      title: 'Test title',
      pubDate: '2000-01-01',
      body: 'Test body'
    }
  ])

  useEffect(() => {
  }, [setIdeas])

  const cmp = (a, b) => {
    const i = -a.pubDate.localeCompare(b.pubDate)
    if (i === 0) {
      return -(a.slug - b.slug)
    }
    return i
  }

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Divider variant={'middle'} className={classes.ideaItemDivider} />
        {
          Object.values(ideas).sort(cmp).map(idea => (
            <Fragment key={idea.title}>
              <ContentCard>
                <CardContent>
                  <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                      <Typography variant={'h6'}>
                        {idea.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={'caption'}>
                        {formatDatetime(idea.pubTime)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant={'subtitle1'}>
                    {idea.body}
                  </Typography>
                </CardContent>
              </ContentCard>
              <Divider variant={'middle'} className={classes.ideaItemDivider} />
            </Fragment>
          ))
        }
      </div>
      <Footer />
    </div>
  )
}
