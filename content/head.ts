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
  }),
  '/utils/brotli': {
    title: 'Brotli online encode/decode tool',
    description: 'Decode locally with WASM via npm package brotli-dec-wasm, and encode remotely with Azure Functions via myl7/brotli-azf'
  }
}

export default head
