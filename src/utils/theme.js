import {createMuiTheme} from '@material-ui/core'

const theme = dark => createMuiTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    type: dark ? 'dark' : 'light'
  }
})

export default theme
