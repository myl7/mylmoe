import React from 'react'
import Layout from '../../components/layout'
import {CardContent, CardHeader} from '@material-ui/core'
import HtmlHead from '../../components/htmlHead'
import WIP from '../../components/wip'

const ArcaeaPage = () => {
  const title = 'Arcaea Scores'
  const description = 'See music game Arcaea song scores of myl7, ' +
    'or look up your own Arcaea scores with a beautiful visualization.'

  return (
    <Layout>
      <HtmlHead title={title} description={description} path={'/pages/arcaea'} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={description} />
      <CardContent>
        <WIP />
      </CardContent>
    </Layout>
  )
}

export default ArcaeaPage
