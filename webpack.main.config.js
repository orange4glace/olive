module.exports = {
    entry: {
      main: './main/main.ts',
    },
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    output: {
      path: __dirname + '/dist/main',
      publicPath: '/',
      filename: '[name].js'
    }
}