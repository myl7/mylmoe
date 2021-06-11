import '../styles.css'
import type {AppProps} from 'next/app'
import Theme from '../components/theme'
import Footer from '../components/footer'
import {Card} from '@material-ui/core'
import FloatAction from '../components/floatAction'
import Header from '../components/header'
import {storeWrapper} from '../redux/store'
import Fireworks from '../components/fireworks'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Theme>
      <Header />
      <Card variant="outlined" style={{margin: '1em 1em 0 1em'}} component="main">
        <Component {...pageProps} />
      </Card>
      <Footer />
      <Fireworks />
      <FloatAction />
    </Theme>
  )
}

export default storeWrapper.withRedux(MyApp)
