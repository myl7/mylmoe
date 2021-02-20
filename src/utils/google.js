export const searchUrl = (q, siteUrl) => {
  const params = new URLSearchParams([['q', q], ['as_sitesearch', siteUrl], ['ncr', '1']])
  return 'https://www.google.com/search?' + params.toString()
}
