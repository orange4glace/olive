const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const md5 = require('./md5')

module.exports = {
    entry: {
      starter: './app/starter/index.js',
      entry: './app/entry/index.js',
      app: './app/index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                // https://velopert.com/3447
                test: /\.scss$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            // localIdentName: '[name]__[local]__[hash:base64:5]',
                            getLocalIdent: (context, localIdentName, localName, options) => {
                                if (localName == 'component') 
                                    return localName + "__" + md5(context.resourcePath).substring(0, 5)
                                else return localName;
                            },
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                          // Necessary for external CSS imports to work
                          // https://github.com/facebookincubator/create-react-app/issues/2677
                          ident: 'postcss',
                          plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                              browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                              ],
                              flexbox: 'no-2009',
                            }),
                          ],
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                        options: {

                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|jpg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader?classPrefix'
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
          {
            from: './renderer/worker.js',
            to: './renderer/'
          }
        ])
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
    }
}