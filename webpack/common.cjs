const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-throw-expressions'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './raw/posts/',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'mlblog',
      template: 'assets/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: 'index.bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  }
}
