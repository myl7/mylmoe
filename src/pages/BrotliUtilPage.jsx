import React from 'react'
import {CardContent, makeStyles, Divider} from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'

const useStyles = makeStyles(theme => ({}))

export default () => {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <Divider />
      <ContentCard>
        <CardContent>
          !!WIP!!
        </CardContent>
      </ContentCard>
      <Footer />
    </div>
  )
}
