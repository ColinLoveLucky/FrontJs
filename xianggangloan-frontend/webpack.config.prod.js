const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const enviroment=require('./environment.json');
module.exports = {
    devtool: 'eval-source-map', // 根据情况修改参数
    entry: {
        app: './src/app/app.js',
        vendor: './src/vendor.js'
    },
    output: {
        path:  __dirname + "/dist",
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                })
            },
            {
                test: /\.(jpg|png|gif|ico)$/,
                use: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(svg|woff2|ttf|woff|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            favicon: 'src/dr-favicon.ico',
            hash: true
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {discardComments: {removeAll: true}}
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new webpack.DefinePlugin({
            IsDebug: false,
            APIENDPOINT: JSON.stringify(enviroment.APIEndpoint),
            BIPOINTURL:JSON.stringify(enviroment.BiPointUrl)
        })
    ]
};
