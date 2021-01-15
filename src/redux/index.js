import {createStore} from 'redux'
import postFilter from './postFilter'
import themeFilter from './themeFilter'

export const initState = {
  posts: {},
  theme: {
    dark: null
  }
}

const reducer = (s, a) => {
  const sep = a.type.indexOf('.')
  const app = a.type.substring(0, sep)
  a.type = a.type.substring(sep + 1)

  switch (app) {
    case 'post':
      return postFilter(s, a)
    case 'theme':
      return themeFilter(s, a)
    default:
      return s
  }
}

const enhancer = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
  undefined

export const store = createStore(reducer, initState, enhancer)
