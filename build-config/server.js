const path = require('path');

module.exports = (env, argv) => {
  const SERVER_PATH = './start.js'

  return ({
    entry: {
      startWalkme: SERVER_PATH,
      initWalkme: './init.js'
    },
    output: {
      path: path.join(__dirname, '../public/'),
      publicPath: '../../testfolder/',
      filename: '[name].js'
    },
    mode: 'production',
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  })
}