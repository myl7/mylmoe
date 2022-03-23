import esbuild from 'esbuild'
import mdx from '@mdx-js/esbuild'

const args = process.argv.slice(1)
if (args.length <= 2) {
  process.exit(1)
}

const ignoreCssImport = {
  name: 'ignore-css-import',
  setup(build) {
    build.onLoad({ filter: /\.css(\.ts)?$/ }, () => ({ contents: '' }))
  },
}

await esbuild.build({
  entryPoints: [args[1]],
  outfile: args[2],
  bundle: true,
  platform: 'node',
  target: 'es2022',
  format: 'esm',
  external: ['./node_modules/*'],
  inject: ['scripts/misc/react-shim.ts'],
  plugins: [mdx(), ignoreCssImport],
})
