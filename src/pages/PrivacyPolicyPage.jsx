import React from 'react'
import {CardContent, Divider, makeStyles, Typography} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import Markdown from 'markdown-to-jsx'
import Header from '../components/Header'
import ContentCard from '../components/ContentCard'
import WideDivider from '../components/WideDivider'
import Footer from '../components/Footer'
import privacyPolicyText from '../assets/privacyPolicyText.md'
import {md2jsxOptions} from '../utils/md2jsx'

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.main
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <div>
      <Helmet>
        <title>Privacy policy | mylmoe</title>
        <meta name={'description'} content={'mylmoe privacy policy page'} />
        <link rel="canonical" href="https://myl.moe/pages/privacy-policy" />
      </Helmet>
      <Header />
      <Divider />
      <ContentCard className={classes.content}>
        <CardContent>
          <Typography variant={'h4'} component={'h1'}>
            Privacy policy
          </Typography>
          <WideDivider />
          <Markdown options={md2jsxOptions}>{privacyPolicyText}</Markdown>
        </CardContent>
      </ContentCard>
      <Footer />
    </div>
  )
}
