const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'
const isProd = ENV !== 'development'
const output = isProd ? 'build' : 'public'

module.exports = {
  mode: ENV,
  entry: {
    main: ['./src/main.js']
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, output)
  },
  plugins: [new htmlPlugin({ template: 'src/index.html' })].concat(
    isProd
      ? [new CopyWebpackPlugin([{ from: '**/*', to: '.', context: 'public' }])]
      : []
  ),
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    historyApiFallback: true,
    useLocalIp: true
  }
}
