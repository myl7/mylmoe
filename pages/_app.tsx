import 'normalize.css'
import '../styles.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/source-code-pro/400.css'
import type {AppProps} from 'next/app'
import Theme from '../components/theme'
import Footer from '../components/footer'
import {Card} from '@material-ui/core'
import FloatAction from '../components/floatAction'
import Header from '../components/header'
import {storeWrapper} from '../redux/store'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Theme>
      <Header />
      <Card variant="outlined" style={{margin: '5em 1em 0 1em'}} component="main">
        <Component {...pageProps} />
      </Card>
      <Footer />
      <FloatAction />
    </Theme>
  )
}

export default storeWrapper.withRedux(MyApp)
