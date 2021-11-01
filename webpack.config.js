const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const precss = require('precss');

const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'build/js/script.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
		{
		  test: /font-awesome\.config\.js/,
		  use: [
			{
				loader: 'style-loader'
			},
			{
				loader: 'font-awesome-loader'
			}
		  ]
		},
		{
			test: /\.(scss)$/,
			use: ExtractTextPlugin.extract({
			  fallback: 'style-loader',
			  use: [
				{
				  loader: 'css-loader', // translates CSS into CommonJS modules
				}, {
				  loader: 'postcss-loader', // Run post css actions
				  options: {
					plugins() {
					  // post css plugins, can be exported to postcss.config.js
					  return [
						precss,
						autoprefixer
					  ];
					}
				  }
				}, {
				  loader: 'sass-loader' // compiles SASS to CSS
				}
			  ]
			})
        },
		{ // sass / scss / css loader for webpack
			test: /\.(css)$/,
			loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
		},
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		use: [{
			loader: 'url-loader?limit=10000&name=/build/fonts/[name].[ext]'
		}]
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
		use: [{
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: '/build/fonts/'
			}
		}]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=/build/images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'build/css/style.css',
      allChunks: true,
    }),
  ],
};
