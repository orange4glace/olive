const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const md5 = require('./md5')

module.exports = [{
  entry: {
    initializer: './app/window/initializer.ts',
    window: './app/window/index.tsx',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
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
        test: /\.(woff(2)?|ttf|eot|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.node']
  },
  output: {
    path: __dirname + '/dist/app',
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
  ]
},



{
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