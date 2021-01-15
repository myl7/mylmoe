import React from 'react'
import {Provider} from 'react-redux'
import {store} from './redux'
import ThemedApp from './ThemedApp'

export default () => {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  )
}
