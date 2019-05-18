const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const PORT = 3011;

module.exports = {
    devtool: "source-map",
    entry: {
        main: path.join(ROOT_PATH, '/src/client/client.js')
    },//如果单独只有一个入口简写entry: path, 键名默认时main
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-native$': 'react-native-web'
        }
    },
    mode: "development",
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'public/static'),    //css、js文件打包之后输出目录
        publicPath: '/static'   //静态资源目录
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: ['transform-decorators-legacy']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    //"style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[local]-[hash:base64:5]"
                        }
                    },//样式名 加上文件路径名 防止重名
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')(),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    //"style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[local]-[hash:base64:5]"
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    //"style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    //"style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },            
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /.(png)|(jpg)|(jpeg)|(gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 50000
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'), //index.html所在目录(相当于web服务器跟目录)
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0',
        port: PORT
    }
};