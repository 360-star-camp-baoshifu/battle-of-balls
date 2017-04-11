const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');
const envConfig = require('../config/index');

module.exports = {
    entry: './app/src/main.js',
    output: {
        path: DIST_PATH,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=25000&name=images/[name].[ext]',
            exclude: '/node_modules'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': envConfig.env
        }),
        new HtmlWebpackPlugin({
            title: 'Demo',
            filename: './index.html', // 相对于output.path的路径
            template: './app/src/index.html',
            inject: 'body',
            minify: {
                removeComments: true
            },
            // favicon: './src/assets/favicon.png',
        })
    ],
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    resolve: {
        extensions: [
            '.js',
            '.scss'
        ],
        alias: {
            'root': ROOT_PATH,
            'src': SRC_PATH,
            'assets': SRC_PATH + '/assets',
            'node_modules': ROOT_PATH + '/node_modules',
        }
    }
}