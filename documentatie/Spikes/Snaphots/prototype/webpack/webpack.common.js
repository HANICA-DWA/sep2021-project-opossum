const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const srcDir = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    popup: path.join(srcDir, 'views', 'popup.jsx'),
    options: path.join(srcDir, 'views', 'options.jsx'),
    snapshot: path.join(srcDir, 'views', 'snapshot.jsx'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background'
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './public', to: '../'},
        { from: 'manifest.json', to: '../' },
        { from: './src/extension', to: '../extension' },
        { from: './src/common', to: '../common' },
        { from: './src/lib', to: '../lib' },
        { from: './_locales', to: '../_locales' },
      ],
      options: {},
    }),
  ],
}
