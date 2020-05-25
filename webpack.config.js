/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')

module.exports = env => {

  env = env || {}

  const isProd = env.mode === 'production'
  const fileName = isProd ? '[name]-[hash]' : '[name]'

  const srcPath = path.join(__dirname, 'src')
  const outputPath = path.resolve(__dirname, 'build')

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: {
      index: './src/index.tsx',
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    module: {
      rules: [{
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      alias: {
        '~': srcPath,
      },
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['!*.html', '!*.ico'],
      }),
      new MiniCssExtractPlugin({
        filename: fileName + '.css',
      }),
      new HtmlWebpackPlugin({
        title: 'PREACT - Тест',
        favicon: 'public/favicon.ico',
        template: 'public/index.html',
        path: '',
      }),
    ],
    output: {
      filename: fileName + '.js',
      path: outputPath,
      publicPath: '',
    },
    performance: {
      hints: false,
    },
  }
}