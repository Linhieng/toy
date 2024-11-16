const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		entry: {
			popup: './src/popup/popup.tsx',
			background: './src/scripts/background.ts',
			contentScript: './src/scripts/contentScript.ts',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: 'src/popup/popup.html',
				chunks: ['popup'],
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: 'src/manifest.json', to: 'manifest.json' },
					// { from: 'src/icons', to: 'icons' },  // 复制任何其他资产
				],
			}),
		],
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'inline-source-map',  // 在生产中禁用源映射
	}
}
