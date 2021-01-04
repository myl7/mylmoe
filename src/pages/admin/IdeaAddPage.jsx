import React, {useState} from 'react'
import {Button, CardContent, debounce, Grid, makeStyles, TextField, Typography} from '@material-ui/core'
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

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleEdit = setter => e => {
    debounce(setter, 0.4)(e.target.value)
  }

  const handlePublish = () => {
    new IdeaAddApi().add({
      title: title,
      body: body,
      pubTime: dayjs.utc().format('YYYY-MM-DDTHH:mm:ss')
    }).then(ok => {
      if (!ok) {
        console.log('Add idea failed')
      }
    })
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
                  <TextField label={'Title'} variant={'outlined'} fullWidth value={title}
                             onChange={handleEdit(setTitle)} />
                </Grid>
                <Grid item>
                  <TextField label={'Body'} multiline rows={10} variant={'outlined'} fullWidth value={body}
                             onChange={handleEdit(setBody)} />
                </Grid>
                <Grid item>
                  <Grid container justify={'center'}>
                    <Grid item>
                      <Button color={'primary'} variant={'outlined'} onClick={handlePublish}>
                        <Typography variant={'subtitle1'}>
                          Publish
                        </Typography>
                      </Button>
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
