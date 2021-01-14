import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HtmlHead from '../../components/HtmlHead'
import BodyCard from '../../components/BodyCard'

export default props => {
  const {title, description, subheader, path, children, card = true} = props

  return (
    <div>
      <HtmlHead title={title} desciption={description} path={path} />
      <Header />
      {card ? (
        <BodyCard title={title} subheader={subheader}>
          {children}
        </BodyCard>
      ) : children}
      <Footer />
    </div>
  )
}
