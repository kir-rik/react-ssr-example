const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, '../server/index.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  name: 'server',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, '../client/src'), 'node_modules'],
    extensions: ['.jsx','.js'],
  },
  externals: [nodeExternals()],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ],
      },
    ],
  },
};
