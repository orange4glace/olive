module.exports = [{
  entry: {
    internal: './app/internal/index.ts'
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
    ]
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    path: __dirname + '/dist/app',
    publicPath: '/',
    filename: '[name].js'
  }
}]