// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React, { CSSProperties, useEffect, useRef } from 'react'
import { handleResize, handleTap, tap } from '../utils/fireworks'

const style: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 99999,
  pointerEvents: 'none',
}

const filter = (e: MouseEvent | TouchEvent) => {
  for (const elem of (e as any).path) {
    const role = elem.attributes ? elem.attributes.getNamedItem('role') : null
    if (
      ['A', 'BUTTON', 'HEADER', 'TEXTAREA'].indexOf(elem.nodeName) >= 0 ||
      (role && (role.value == 'presentation' || role.value == 'button'))
    ) {
      return false
    }
  }
  return true
}

declare global {
  interface Window {
    fireworkResizeListener?: () => void
  }

  interface Document {
    fireworkTapListener?: (e: MouseEvent | TouchEvent) => void
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
      document.removeEventListener(tap(), document.fireworkTapListener)
    }
    document.fireworkTapListener = handleTap(filter, ref.current!)
    document.addEventListener(tap(), document.fireworkTapListener)
  }, [ref])

  return <canvas style={style} ref={ref} />
}

export default Fireworks
