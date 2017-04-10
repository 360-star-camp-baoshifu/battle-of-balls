const webpack = require('webpack');
const config = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.devtool = '#source-map';


config.devServer = {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    noInfo: true,
    port: 8008
};

module.exports = config
