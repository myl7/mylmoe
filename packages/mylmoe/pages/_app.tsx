import 'normalize.css'

import '../styles.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/source-code-pro/400.css'

import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import store from '../redux/store'
import Theme from '../components/theme'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </Provider>
  )
}

export default MyApp
