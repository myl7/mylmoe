let posts = [
  {
    'title': 'Arcaea 付费建议',
    'id': 5,
    'slug': '2020-10-13-arcaea-pay',
    'date': '2020-10-13',
    'url': 'https://myl.moe/raw/posts/2020-10-13-arcaea-pay.md'
  },
  {
    'title': 'Minimized dotfiles sharing',
    'id': 4,
    'slug': '2020-10-08-min-dotfiles',
    'date': '2020-10-08',
    'url': 'https://myl.moe/raw/posts/2020-10-08-min-dotfiles.md'
  },
  {
    'title': 'Python YAML + Beautiful Soup reports RecursionError',
    'id': 3,
    'slug': '2020-10-02-yaml-beautifulsoup-recusive-error',
    'date': '2020-10-02',
    'url': 'https://myl.moe/raw/posts/2020-10-02-yaml-beautifulsoup-recusive-error.md'
  },
  {
    'title': '配置 MIUI 国内版为基本能用的系统',
    'id': 2,
    'slug': '2020-09-30-miui-setup',
    'date': '2020-09-30',
    'url': 'https://myl.moe/raw/posts/2020-09-30-miui-setup.md'
  },
  {
    'title': '红米 Note 8 Pro 联发科 G90T 版刷入类原生安卓系统 crDroid Android 10',
    'id': 1,
    'slug': '2020-09-30-install-crdroid-android10-on-redmi-note8pro-mtk-g90t',
    'date': '2020-09-30',
    'url': 'https://myl.moe/raw/posts/2020-09-30-install-crdroid-android10-on-redmi-note8pro-mtk-g90t.md'
  }
]

if (process.env.NODE_ENV === 'development') {
  const getPostMockUrl = (slug) => `http://127.0.0.1:8080/raw/posts/${slug}.md`
  posts = posts.map(meta => {
    meta.url = getPostMockUrl(meta.slug)
    return meta
  })
}

export default posts
