import React, {useEffect, useRef, useState} from 'react'
import Layout from '../../components/layout'
import {CardContent, CardHeader, Grid, Typography} from '@material-ui/core'
import HtmlHead from '../../components/htmlHead'
import {useDispatch, useSelector} from 'react-redux'
import {brotliInitAction} from '../../redux/brotliRedux'
import init, {brotliDec} from '../../utils/brotli'
import {arcaeaProber} from '../../api/arcaea'
import {graphql, useStaticQuery} from 'gatsby'
import DigitInput from '../../components/digitInput'
import {arcaeaSetAction} from '../../redux/arcaeaRedux'
import ArcaeaUserInfo from '../../components/arcaea/arcaeaUserInfo'
import ArcaeaScoreList from '../../components/arcaea/arcaeaScoreList'
import WaitButton from '../../components/waitButton'

const ArcaeaPage = () => {
  const title = 'Arcaea Scores'
  const description = 'See music game Arcaea song scores of myl7, ' +
    'or look up your own Arcaea scores with a beautiful visualization.'

  const dispatch = useDispatch()

  const brotliInit = useSelector(state => state.brotli.init)

  const data = useStaticQuery(graphql`
    query ArcaeaQuery {
      file(relativePath: {eq: "brotli-dec-wasm_bg.wasm"}) {
        publicURL
      }
      site {
        siteMetadata {
          author {
            arcaeaId
          }
        }
      }
    }
  `)
  const brotliUrl = data.file.publicURL
  const arcaeaId = data.site.siteMetadata.author.arcaeaId

  const ref = useRef()

  useEffect(() => {
    const uid = ref.current.value
    if (brotliInit) {
      brotliInit.then(() => {
        arcaeaProber({uid: uid, brotliDec: brotliDec}).then(res => {
          dispatch(arcaeaSetAction(uid, res))
        })
      })
    } else {
      dispatch(brotliInitAction(init(brotliUrl)))
    }
  }, [brotliInit, ref, dispatch, brotliUrl])

  const [wait, setWait] = useState(false)

  const handleClick = () => {
    const uid = ref.current.value
    const timer = setTimeout(() => setWait(true), 1000)
    brotliInit.then(() => {
      arcaeaProber({uid: uid, brotliDec: brotliDec}).then(res => {
        dispatch(arcaeaSetAction(uid, res))
        clearTimeout(timer)
        setWait(false)
      })
    })
  }

  const [error, setError] = useState('')

  const {data: arcaeaData} = useSelector(state => state.arcaea)
  const {songTitle, userInfo, scores} = arcaeaData

  return (
    <Layout>
      <HtmlHead title={title} description={description} path={'/pages/arcaea'} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={description} />
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <DigitInput label={'Arcaea User ID'} inputRef={ref} error={error} setError={setError}
                        defaultValue={arcaeaId} />
          </Grid>
          <Grid item>
            <WaitButton variant="outlined" wait={wait} onClick={handleClick}>
              <Typography variant="subtitle1">
                Query scores
              </Typography>
            </WaitButton>
          </Grid>
        </Grid>
        {userInfo ? <ArcaeaUserInfo userInfo={userInfo} songTitle={songTitle} style={{marginTop: '1em'}} /> : ''}
        {scores ? <ArcaeaScoreList scores={scores} songTitle={songTitle} /> : ''}
      </CardContent>
    </Layout>
  )
}

export default ArcaeaPage
