var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var Express = require('express');

var config = require('./webpack.config');

var app = new Express();
var port = 3000;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function (error) {
  if (error) {
    return console.error(error);
  }

  console.info(
    'Listening on port %s. Visit http://localhost:%s/ in your browser.',
    port,
    port
  );
});
