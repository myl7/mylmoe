const postItem = {
  id: 2,
  slug: '2000-hello-world',
  title: 'hello',
  excerpt: 'hw',
  pubDate: '1999-05-06',
  updDate: '2000-01-01'
}

export const postData = {
  ...postItem,
  body: 'test 😄️'
}

export const postsData = [
  {
    id: 1,
    slug: 'test',
    title: 'test title',
    excerpt: 'test 😄️',
    pubDate: '2000-07-07',
    updDate: '2000-08-08'
  },
  postItem
]
