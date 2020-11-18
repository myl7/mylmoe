import React, {forwardRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default forwardRef((props, ref) => (
  <div>
    <Header />
    <div {...props} ref={ref} />
    <Footer />
  </div>
))
