import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import vim from 'highlight.js/lib/languages/vim'
import json from 'highlight.js/lib/languages/json'
import js from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('python', python)
hljs.registerLanguage('vim', vim)
hljs.registerLanguage('json', json)
hljs.registerLanguage('js', js)
hljs.registerLanguage('jsx', js)

hljs.configure({languages: []})

export default hljs
