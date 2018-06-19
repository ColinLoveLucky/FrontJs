import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export default {
    devtool: 'source-map', // 根据情况修改参数
    entry: {
        app: './src/app/app.js',
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dev"),
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
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
                    use: 'css-loader'
                })
            },
            {
                test: /\.(jpg|png|gif|svg|woff2|ttf|woff|eot|ico)$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        //generate html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/dr-favicon.ico',
            inject: true
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new webpack.DefinePlugin({
            IsDebug: true,
            APIENDPOINT: JSON.stringify("http://172.16.6.35:1111/opchannel"),
            BIPOINTURL: JSON.stringify("https://beans-demo.dianrong.com/reports/3/view")
        })
    ]
};
