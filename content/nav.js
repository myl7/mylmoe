const nav = [
  {
    text: 'Pages',
    list: [
      {text: 'About'},
      {text: 'Arcaea'},
      {text: 'Privacy Policy'}
    ]
  },
  {
    text: 'Utils',
    list: [
      {text: 'Brotli'}
    ]
  },
  {text: 'Friends'}
]

/**
 * @param {string} text
 */
export const genTo = text => '/pages/' + text.toLowerCase().replace(' ', '-')

export default nav
