import React, {forwardRef} from 'react'
import ExtLink from './extLink'

const style = {
  color: 'inherit',
  textDecoration: 'inherit'
}

const ExtLinkReset = forwardRef((props, ref) => {
  const {style: parentStyle, ...others} = props

  return <ExtLink style={{...style, ...parentStyle}} ref={ref} {...others} />
})

export default ExtLinkReset
