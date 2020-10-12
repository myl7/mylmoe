import React from 'react'
import {Link} from '@material-ui/core'

export default (props) => {
  const {...others} = props

  return <Link target={'_blank'} rel={'noopener'} {...others} />
}
