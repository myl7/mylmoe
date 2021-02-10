import React from 'react'
import Layout from '../components/layout'
import {CardContent} from '@material-ui/core'
import HtmlHead from '../components/htmlHead'
import TextBanner from '../components/textBanner'

const NotFoundPage = () => {
  return (
    <Layout>
      <HtmlHead title={'404 Not Found'} description={''} path={'/404.html'}>
        <meta name="robots" content="noindex,nofollow" />
      </HtmlHead>
      <CardContent>
        <TextBanner text="404 Not Found!" />
      </CardContent>
    </Layout>
  )
}

export default NotFoundPage
