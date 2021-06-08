import React, {CSSProperties, useEffect, useRef} from 'react'
import {handleResize, handleTap, tap} from '../utils/fireworks'

const style: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 99999,
  pointerEvents: 'none'
}

const filter = (e: React.MouseEvent) => {
  // @ts-ignore
  for (const elem of e.path) {
    const role = elem.attributes ? elem.attributes.getNamedItem('role') : null
    if (['A', 'BUTTON', 'HEADER', 'TEXTAREA'].indexOf(elem.nodeName) >= 0 ||
      (role && (role.value === 'presentation' || role.value === 'button'))) {
      return false
    }
  }
  return true
}

declare global {
  interface Window {
    fireworkResizeListener: () => void
  }

  interface Document {
    fireworkTapListener: (e: React.MouseEvent) => void
  }
}

const Fireworks = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.fireworkResizeListener) {
      window.removeEventListener('resize', window.fireworkResizeListener)
    }
    window.fireworkResizeListener = handleResize(ref.current!)
    window.addEventListener('resize', window.fireworkResizeListener)
    window.fireworkResizeListener()
  }, [ref])

  useEffect(() => {
    if (document.fireworkTapListener) {
      // @ts-ignore
      document.removeEventListener(tap(), document.fireworkTapListener)
    }
    document.fireworkTapListener = handleTap(filter, ref.current!)
    // @ts-ignore
    document.addEventListener(tap(), document.fireworkTapListener)
  }, [ref])

  return <canvas style={style} ref={ref} />
}

export default Fireworks
