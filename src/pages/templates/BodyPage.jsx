import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HtmlHead from '../../components/HtmlHead'
import BodyCard from '../../components/BodyCard'
import {Fab, makeStyles} from '@material-ui/core'
import {ArrowUpward as ArrowUpwardIcon} from '@material-ui/icons'
import {animateScroll} from 'react-scroll'

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: '2em',
    right: '2em'
  }
})

export default props => {
  const {title, description, subheader, path, children, card = true} = props

  const classes = useStyles()

  const handleGoTopClick = () => {
    animateScroll.scrollToTop()
  }

  return (
    <div>
      <HtmlHead title={title} desciption={description} path={path} />
      <Header />
      {card ? (
        <BodyCard title={title} subheader={subheader}>
          {children}
        </BodyCard>
      ) : children}
      <Fab aria-label={'go top'} className={classes.fab} color={'primary'} onClick={handleGoTopClick}>
        <ArrowUpwardIcon />
      </Fab>
      <Footer />
    </div>
  )
}
