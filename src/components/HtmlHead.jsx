import React from 'react'
import {Helmet} from 'react-helmet'

export default props => {
  const {title, description, path, ...others} = props

  return (
    <Helmet {...others}>
      <title>{title} | mylmoe</title>
      <meta name={'description'} content={description} />
      <link rel="canonical" href={'https://myl.moe' + path} />
    </Helmet>
  )
}
