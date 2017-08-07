/* eslint-disable import/no-extraneous-dependencies, object-property-newline */
// Very similar to webpack.dev.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {

  // For production build we want to extract CSS to stand-alone file
  // Provide `extractStyles` param and `bootstrap-loader` will handle it
  entry: [
    'webpack-hot-middleware/client',
    'tether',
    'font-awesome-loader',
    'bootstrap-loader/extractStyles',
    './app/scripts/app'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  devtool: '#cheap-module-eval-source-map',

  resolve: { extensions: ['*', '.js'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether'
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer]
    })
  ],

  module: {
    rules: [
      { test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: 'css-loader!postcss-loader'
      }) },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'
      }) },

      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },

      // Serve jQuery for Bootstrap scripts:
      { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' }
    ]
  }

};
