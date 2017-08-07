/* eslint-disable no-console, import/no-extraneous-dependencies */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const buildConfig = require('./webpack.config');

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 4000;

const server = express();
const compiler = webpack(buildConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: buildConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
}));

server.use(webpackHotMiddleware(compiler));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', (req, res) => ( // eslint-disable-line no-unused-vars
  res.sendFile(path.join(__dirname, 'app', 'markup', 'bootstrap.html'))
));

server.listen(PORT, IP, (err) => {
  if (err) console.log(`=> ERROR! ${err}`);
  console.log(`=> Webpack dev server is running on port ${PORT}`);
});
