// webpack.config.js
module.exports = {
  entry: './client/index.js',
  output: {
    filename: './public/client.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
