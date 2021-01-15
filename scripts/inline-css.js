import fs from 'fs'
import https from 'https'

let css = fs.readFileSync('public/index.css').toString()
https.get('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Roboto:wght@300;400;500;700&family=Source+Code+Pro&display=swap', res => {
  res.on('data', d => {
    css += d.toString()
    https.get('https://fonts.googleapis.com/icon?family=Material+Icons', res => {
      res.on('data', d => {
        css += d.toString()
        https.get('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/atom-one-dark.min.css', res => {
          res.on('data', d => {
            css += d.toString()

            let html = fs.readFileSync('dist/tmp/index.html').toString()
            html = html.replace('/*css*/', css)
            fs.writeFileSync('dist/tmp/index.html', html)
          })
        }).end()
      })
    }).end()
  })
}).end()
