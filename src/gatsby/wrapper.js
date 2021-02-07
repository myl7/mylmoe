import React from 'react'
import {Provider} from 'react-redux'
import store from '../redux/store'

const Wrapper = ({element}) => {
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}

export default Wrapper
