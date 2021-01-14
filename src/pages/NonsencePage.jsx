import React, {useEffect, useState} from 'react'
import {Typography, makeStyles} from '@material-ui/core'
import Markdown from 'markdown-to-jsx'
import {formatDatetime} from '../utils/dayjs'
import IdeaApi from '../apis/IdeaApi'
import {md2jsxOptions} from '../utils/md2jsx'
import hljs from '../utils/hljs'
import BodyPage from './BodyPage'
import BodyCard from '../components/BodyCard'

const useStyles = makeStyles({
  container: {
    minHeight: 'calc(100vh - 177px)'
  },
  card: {
    backgroundColor: '#2c2c2c',
    margin: '1em'
  }
})

export default () => {
  const classes = useStyles()

  // noinspection JSUnusedLocalSymbols
  const [slugs, setSlugs] = useState([])
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    new IdeaApi().ideas().then(res => {
      setIdeas(ideas => [...ideas, ...res.ideas])
      setSlugs(res.slugs)
    })

    document.querySelectorAll('div#root pre > code').forEach(elem => {
      hljs.highlightBlock(elem)
    })
  }, [setIdeas, setSlugs])

  return (
    <BodyPage title={'myl7\'s nonsence'}
              description={'Some tips, some summaries, some grumbles, some options, some feelings...'}
              path={'/pages/nonsence'} card={false}>
      <BodyCard className={classes.card} variant={'outlined'} title={'myl7\'s nonsence'}
                subheader={'Some tips, some summaries, some grumbles, some options, some feelings...'}>
        <div className={classes.container}>
          {
            Object.values(ideas).map(idea => (
              <BodyCard key={formatDatetime(idea.pubTime)} title={
                <Typography variant={'h6'}>
                  {formatDatetime(idea.pubTime)}
                </Typography>
              } component={'article'} variant={'outlined'} titleComponent={'h2'}>
                <Markdown options={md2jsxOptions}>
                  {idea.body}
                </Markdown>
              </BodyCard>
            ))
          }
        </div>
      </BodyCard>
    </BodyPage>
  )
}
