import React from 'react'
import './layout.css'

const Layout = props => {
  const {children} = props

  return (
    <div>
      {children}
    </div>
  )
}

export default Layout
