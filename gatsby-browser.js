const React = require('react')
const {Provider} = require('react-redux')
const store = require('./src/redux/store').default

exports.wrapRootElement = ({element}) => {
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}
