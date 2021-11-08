import {Button, ButtonProps, CircularProgress} from '@material-ui/core'
import {CSSProperties, FC} from 'react'
import {Close as CloseIcon, Done as DoneIcon} from '@material-ui/icons'

export interface StatusButtonProps extends ButtonProps {
  status: 'none'|'waiting'|'failed'|'ok',
  statusSize?: number
}

const StatusButton: FC<StatusButtonProps> = props => {
  const {status, statusSize = 25, ...others} = props

  const statusStyle: CSSProperties = {
    display: 'inline-block',
    marginLeft: '1em',
    verticalAlign: 'middle'
  }

  return (
    <>
      <Button style={{display: 'inline-block', verticalAlign: 'middle'}} {...others} />
      {
        status == 'none' ? '' : (
          status == 'waiting' ? (
            <CircularProgress style={statusStyle} size={statusSize} />
          ) : (() => {
            const style: CSSProperties = {...statusStyle, fontSize: statusSize}
            return status == 'failed' ? (
              <CloseIcon style={style} color={'error'} />
            ) : (
              <DoneIcon style={style} color={'action'} />
            )
          })()
        )
      }
    </>
  )
}

export default StatusButton
