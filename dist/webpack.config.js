module.exports = {
  entry: __dirname + '/../',
  output: {
    path: __dirname,
    filename: 'tydel.js',
    libraryTarget: 'this',
    library: 'tydel'
  },
  externals: {
    lodash: '_'
  }
};
