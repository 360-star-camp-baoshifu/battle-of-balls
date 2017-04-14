const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WebpackMd5Hash = require('webpack-md5-hash');
const config = require('./webpack.config.js');

const styleLoaders = [{
    test: /\.s[a|c]ss$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style',
        use: [{
            loader: 'css',
            options: {
              minimize: true
            }
        }, {
            loader: 'postcss',
            options: {
              plugins: () => [autoprefixer]
            }
        }, {
            loader: 'sass'
        }]
    })
}, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
        fallback: "style",
        use: [{
            loader: 'css',
            options: {
              minimize: true
            }
        }, {
            loader: 'postcss',
            options: {
              plugins: () => [autoprefixer]
            }
        }]
    })
}];

config.output.filename = 'main.[hash:12].min.js';

config.module.rules = config.module.rules.concat(styleLoaders);

config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin({
        filename: '[name].[contenthash:8].min.css'
    }),
    new webpack.optimize.UglifyJsPlugin()
);

module.exports = config;