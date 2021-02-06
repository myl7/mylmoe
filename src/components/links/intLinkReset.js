import React, {forwardRef} from 'react'
import IntLink from './intLink'

const style = {
  color: 'inherit',
  textDecoration: 'inherit'
}

const IntLinkReset = forwardRef((props, ref) => {
  const {style: parentStyle, ...others} = props

  return <IntLink style={{...style, ...parentStyle}} ref={ref} {...others} />
})

export default IntLinkReset
