const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.built.js'
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  devServer: {
    publicPath: '/public/',
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
     {
      test: /\.(sa|sc|c)ss$/,
      use: [
       'style-loader',
       'css-loader',
       'sass-loader',
      ],
     }
    ]
  }
}
