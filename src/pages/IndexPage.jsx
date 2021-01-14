import React, {useEffect} from 'react'
import {Typography, makeStyles} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {animateScroll} from 'react-scroll'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'
import BodyPage from './BodyPage'
import BodyCard from '../components/BodyCard'
import RouterLink from '../components/RouterLink'

const useStyles = makeStyles({
  indexContainer: {
    display: 'grid',
    height: '100%'
  },
  indexImage: {
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 64px)',
    margin: 'auto'
  },
  nextContainer: {
    minHeight: '100vh'
  },
  card: {
    backgroundColor: '#2c2c2c',
    margin: '1em'
  }
})

export default () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const posts = useSelector(s => s.posts)

  useEffect(() => {
    new PostApi().posts().then(posts => {
      dispatch({
        type: 'post.all',
        payload: posts
      })
    })
  }, [dispatch])

  const cmp = (a, b) => {
    const i = -a.pubDate.localeCompare(b.pubDate)
    if (i === 0) {
      return -(a.slug - b.slug)
    }
    return i
  }

  const handleRevueClick = () => {
    animateScroll.scrollTo(window.innerHeight)
  }

  return (
    <BodyPage card={false} path={'/'} title={'myl7\'s blog with some other utilities'}
              description={'Welcome to mylmoe!'}>
      <div className={classes.indexContainer} onClick={handleRevueClick}>
        <img className={classes.indexImage} alt={'revue'} src={'/images/revue.jpg'} />
      </div>
      <div className={classes.nextContainer}>
        <BodyCard className={classes.card} variant={'outlined'}
                  title={'mylmoe | myl7\'s blog with some other utilities'}>
          {
            Object.values(posts).sort(cmp).map(post => (
              <BodyCard key={post.slug} component={'article'} titleComponent={'h2'} title={
                <div>
                  <Typography variant={'h6'} color={'textPrimary'} component={RouterLink} to={'/posts/' + post.slug}>
                    {post.title}
                  </Typography>
                </div>
              } subheader={
                <Typography variant={'caption'}>
                  {`Updated at ${formatDate(post.updDate)}, Published at ${formatDate(post.pubDate)}.`}
                </Typography>
              }>
                <div>
                  <Typography variant={'subtitle1'} color={'textPrimary'} component={RouterLink}
                              to={'/posts/' + post.slug}>
                    {post.excerpt}
                  </Typography>
                </div>
              </BodyCard>
            ))
          }
        </BodyCard>
      </div>
    </BodyPage>
  )
}
