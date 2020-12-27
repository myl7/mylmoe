import React from 'react'
import {CardContent, makeStyles, Divider, Typography} from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'
import WideDivider from '../components/WideDivider'

const useStyles = makeStyles(theme => ({}))

export default () => {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <Divider />
      <ContentCard>
        <CardContent>
          <Typography variant={'h4'}>
            Brotli
          </Typography>
          <WideDivider />
          !!WIP!!
        </CardContent>
      </ContentCard>
      <Footer />
    </div>
  )
}
