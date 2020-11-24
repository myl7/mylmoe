import {createStore} from 'redux'
import postFilter from './postFilter'

/**
 * @typedef {Object} State
 * @property {Post[]} posts
 *
 * @typedef {Object} Post
 * @property {string} slug
 * @property {string} title
 * @property {string} abstract
 * @property {string} body
 * @property {string} pub_date
 * @property {string} upd_date
 *
 * @type {State}
 */
export const initState = {
  posts: []
}

const reducer = (s, a) => {
  const sep = a.type.indexOf('.')
  const app = a.type.substring(0, sep)
  a.type = a.type.substring(sep + 1)

  switch (app) {
    case 'post':
      return postFilter(s, a)
    default:
      return s
  }
}

const enhancer = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
  undefined

export const store = createStore(reducer, initState, enhancer)
