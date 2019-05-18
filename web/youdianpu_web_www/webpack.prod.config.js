const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
    devtool: false,
    entry: {
        main: path.join(ROOT_PATH, '/src/client/client.js')
        //vendor: ['react', 'react-dom', 'react-router-dom']
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-native$': 'react-native-web'
        }
    },
    /* externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'antd': 'antd',
        'numeral': 'numeral',
        'moment': 'moment',
    }, */
    mode: "production",
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'public/static'),
        publicPath: '/static/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new BundleAnalyzerPlugin(),
        new webpack.DllReferencePlugin({
            // manifest: merge(require('./public/vendor4-manifest.json'), require('./public/vendor1-manifest.json'), require('./public/vendor2-manifest.json'), require('./public/vendor3-manifest.json')), // 指定manifest.json
            manifest: require('./public/vendor-manifest.json'), // 指定manifest.json
            name: 'vendor',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
            context: __dirname
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
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
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
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
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
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
    }
};