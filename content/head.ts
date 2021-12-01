const head = {
  '/': {},
  '/pages/friends': {
    title: 'Friends',
    description: 'List myl7\'s friends.'
  },
  '/pages/tags': {
    title: 'Tag List',
    descritpion: 'Available tags of blog posts.'
  },
  '/tags/[tag]': (tag: string) => ({
    title: `Tag ${tag}`,
    description: `Available posts with tag ${tag}`
  })
}

export default head
