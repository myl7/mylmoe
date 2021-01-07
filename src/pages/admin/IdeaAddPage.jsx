import React, {useRef, useState} from 'react'
import {Box, Button, CardContent, Grid, makeStyles, Snackbar, TextField, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WideDivider from '../../components/WideDivider'
import ContentCard from '../../components/ContentCard'
import IdeaAddApi from '../../apis/IdeaAddApi'
import dayjs from '../../utils/dayjs'

const useStyles = makeStyles({
  titleDivider: {
    marginBottom: '1em'
  }
})

export default () => {
  const classes = useStyles()

  const titleRef = useRef()
  const bodyRef = useRef()

  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [pubStatus, setPubStatus] = useState(100)

  const handlePublish = () => {
    new IdeaAddApi().add({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      pubTime: dayjs.utc().format('YYYY-MM-DDTHH:mm:ss')
    }).then(status => {
      setPubStatus(status)
      setSnackBarOpen(true)
    })
  }

  const handleSnackBarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBarOpen(false)
  }

  return (
    <div>
      <Header />
      <ContentCard>
        <CardContent>
          <Typography variant={'h4'}>
            Add an idea
          </Typography>
          <WideDivider className={classes.titleDivider} />
          <Grid container justify={'center'}>
            <Grid item sm={6} xs={12}>
              <Grid container direction={'column'} alignItems={'stretch'} spacing={2}>
                <Grid item>
                  <TextField label={'Title'} variant={'outlined'} fullWidth inputRef={titleRef} />
                </Grid>
                <Grid item>
                  <TextField label={'Body'} multiline rows={10} variant={'outlined'} fullWidth inputRef={bodyRef} />
                </Grid>
                <Grid item>
                  <Grid container justify={'center'}>
                    <Grid item>
                      <Button color={'primary'} variant={'outlined'} onClick={handlePublish}>
                        <Typography variant={'subtitle1'}>
                          Publish
                        </Typography>
                      </Button>
                      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={snackBarOpen}
                                autoHideDuration={5000} onClose={handleSnackBarClose}>
                        <Alert onClose={handleSnackBarClose} severity={pubStatus === 201 ? 'success' : 'error'}>
                          {pubStatus === 201 ? (
                            <>
                              Publish{' '}
                              <Box component={'span'} fontStyle={'oblique'}>
                                {titleRef.current.value}
                              </Box>
                              {' '}OK
                            </>
                          ) : 'Error: status = ' + pubStatus.toString()}
                        </Alert>
                      </Snackbar>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </ContentCard>
      <Footer />
    </div>
  )
}
