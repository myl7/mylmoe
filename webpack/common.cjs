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
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
      },
      {
        test: /\.(a?png|gif|jpe?g|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, imagePath, context) => './images/' + path.relative(context + '/assets/images/', imagePath),
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\/rss.xml$/,
        use: [
          {
            loader: 'file-loader',
            options: {
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
