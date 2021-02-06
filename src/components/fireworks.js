import React, {useEffect} from 'react'

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 99999,
  pointerEvents: 'none'
}

const filter = e => {
  for (const elem of e.path) {
    const role = elem.attributes ? elem.attributes.getNamedItem('role') : null
    if (['A', 'BUTTON', 'HEADER'].indexOf(elem.nodeName) >= 0 || (role && role.value === 'presentation')) {
      return false
    }
  }
  return true
}

const Fireworks = () => {
  useEffect(() => {
    import(/* webpackMode: "eager" */ './fireworkEffect').then(m => m.default(filter))
  })

  return <canvas style={style} id="fireworks" />
}

export default Fireworks
