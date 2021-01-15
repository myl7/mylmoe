import React from 'react'
import {Card, CardContent, CardHeader, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    margin: '1em'
  }
})

export default props => {
  const {title, subheader = '', children, titleComponent, ...others} = props

  const classes = useStyles()

  return (
    <Card className={classes.card} elevation={3} {...others}>
      <CardHeader title={title} subheader={subheader}
                  {...(titleComponent ? {titleTypographyProps: {component: titleComponent}} : {})} />
      <CardContent component={'main'}>
        {children}
      </CardContent>
    </Card>
  )
}
