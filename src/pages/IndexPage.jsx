import React, {useEffect, Fragment} from 'react'
import {CardContent, Typography, Grid, makeStyles, Divider} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {animateScroll} from 'react-scroll'
import RouterLink from '../components/RouterLink'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContentCard from '../components/ContentCard'

const useStyles = makeStyles(theme => ({
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
    minHeight: 'calc(100vh - 106px)'
  },
  postItemDivider: {
    backgroundColor: theme.palette.primary.main
  }
}))

export default () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const posts = useSelector(s => s.posts)

  useEffect(() => {
    document.title = 'mylmoe'
  })

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
    <div>
      <Header />
      <div className={classes.indexContainer} onClick={handleRevueClick}>
        <img className={classes.indexImage} alt={'revue'}
             src={'https://cdn.jsdelivr.net/gh/myl7/mylmoe-images@goshujin-sama/revue.jpg'} />
      </div>
      <div className={classes.nextContainer}>
        <Divider variant={'middle'} className={classes.postItemDivider} />
        {
          Object.values(posts).sort(cmp).map(post => (
            <Fragment key={post.slug}>
              <ContentCard>
                <CardContent>
                  <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                      <RouterLink to={`/posts/${post.slug}`}>
                        <Typography variant={'h6'}>
                          {post.title}
                        </Typography>
                      </RouterLink>
                    </Grid>
                    <Grid item>
                      <Typography variant={'caption'}>
                        | pubDate: {formatDate(post.pubDate)} | updDate: {formatDate(post.updDate)} |
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant={'subtitle1'}>
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </ContentCard>
              <Divider variant={'middle'} className={classes.postItemDivider} />
            </Fragment>
          ))
        }
      </div>
      <Footer />
    </div>
  )
}
