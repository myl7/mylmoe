import {createMuiTheme} from '@material-ui/core'

export default createMuiTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#eeeeee'
    },
    secondary: {
      main: '#202020'
    },
    background: {
      main: '#111111'
    },
    text: {
      primary: '#eeeeee'
    }
  }
})
