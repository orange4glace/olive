module.exports = [{
  entry: './app/renderer/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
    ]
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.node']
  },
  output: {
    path: __dirname + '/dist/renderer',
    publicPath: '/',
    filename: '[name].js'
  }
}]