const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/index.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            // {
            //     test: /\.html$/,
            //     exclude: /node_modules/,
            //     loader: 'html-loader'
            // },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            getLocalIdent: (context, localIdentName, localName, options) => {
                                return localName
                            }
                        }
                    }, {
                        loader: "postcss-loader"
                    }],
                })
            },
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {
                test: /\.(jpg|png|gif|svg|woff2|ttf|woff|eot|ico)$/,
                use: 'file-loader'
            }

        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数
            inject: true,
            favicon: 'common/img/dr-favicon.ico',
            hash: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
}