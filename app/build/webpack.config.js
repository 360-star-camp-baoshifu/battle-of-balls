const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WebpackMd5Hash = require('webpack-md5-hash');
const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');
const envConfig = require('../config/index')

module.exports = {
    entry: './app/src/main.js',
    output: {
        path: DIST_PATH,
        publicPath: '/',
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=25000&name=images/[name].[ext]'
        }, {
            test: /\.s[a|c]ss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style',
                use: ['css', 'postcss?sourceMap', 'sass']
            })
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style",
                use: ["css", "postcss"]
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': envConfig.env
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
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
        }),
        new WebpackMd5Hash(),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        new webpack.LoaderOptionsPlugin({ minimize: true })
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