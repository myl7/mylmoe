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

export const themeEffect = dark => {
  document.getElementsByTagName('body')[0].style.setProperty('background-color', dark ? '#303030' : '#fafafa')
  document.querySelectorAll('.inline-code').forEach(inlineCode => {
    inlineCode.style.setProperty('background-color', dark ? '#222222' : '#dddddd')
  })
}
